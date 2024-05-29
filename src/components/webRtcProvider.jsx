import { createContext, useEffect, useRef, forwardRef, useCallback } from 'react';
import { io } from 'socket.io-client';

export const WebRtcContext = createContext({
    toggleMuteAudio: () => {},
    toggleHideVideo: () => {},
    MyVideo: undefined,
    RemoteVideo: undefined,
});

const Video = forwardRef((props, ref) => {
    return <video ref={ref} {...props} />;
});
Video.displayName = 'Video';

export default function WebRtcProvider({ children }) {
    const socketRef = useRef(); // socket
    const myVideoRef = useRef();
    const remoteVideoRef = useRef();

    const peerRef = useRef();

    const toggleMuteAudio = () => {
        const stream = myVideoRef.current?.srcObject;
        if (stream) {
            const audioTracks = stream.getAudioTracks();
            if (audioTracks.length > 0) {
                audioTracks[0].enabled = !audioTracks[0].enabled;
            }
        }
    };

    const toggleHideVideo = () => {
        const stream = myVideoRef.current?.srcObject;
        if (stream) {
            const videoTracks = stream.getVideoTracks();
            if (videoTracks.length > 0) {
                videoTracks[0].enabled = !videoTracks[0].enabled;
            }
        }
    };
    const getMedia = async () => {
        try {
            // iceCandidate 이벤트
            peerRef.current.onicecandidate = (e) => {
                if (e.candidate) {
                    if (!socketRef.current) {
                        return;
                    }
                    console.log('recv candidate', e.candidate);
                    socketRef.current.emit('candidate', {
                        roomId: 10,
                        candidate: e.candidate,
                    });
                }
            };

            // 구 addStream 현 track 이벤트
            peerRef.current.ontrack = (e) => {
                console.log('ontrack', e);
                if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = e.streams[0];
                }
            };
            // 자신이 원하는 자신의 스트림정보
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });

            if (myVideoRef.current) {
                myVideoRef.current.srcObject = stream;
            }
            console.log('peer', peerRef.current);

            // 스트림을 peerConnection에 등록
            stream.getTracks().forEach((track) => {
                console.log('addTrack', track);
                if (!peerRef.current) {
                    console.log('연결 미완료');
                    return;
                }
                peerRef.current.addTrack(track, stream);
            });
        } catch (e) {
            console.error(e);
        }
    };

    const createOffer = async () => {
        console.log('create Offer');
        if (!(peerRef.current && socketRef.current)) {
            return;
        }
        try {
            // offer 생성
            const sdp = await peerRef.current.createOffer();
            // 자신의 sdp로 LocalDescription 설정
            peerRef.current.setLocalDescription(sdp);
            console.log('sent the offer');
            // offer 전달
            socketRef.current.emit('offer', { roomId: 10, offer: sdp });
        } catch (e) {
            console.error(e);
        }
    };

    const createAnswer = async (sdp) => {
        // sdp : PeerA에게서 전달받은 offer

        console.log('createAnswer');
        if (!(peerRef.current && socketRef.current)) {
            return;
        }

        try {
            // PeerA가 전달해준 offer를 RemoteDescription에 등록해 줍시다.
            peerRef.current.setRemoteDescription(sdp);

            // answer생성해주고
            const answer = await peerRef.current.createAnswer();

            // answer를 LocalDescription에 등록해 줍니다. (PeerB 기준)
            peerRef.current.setLocalDescription(answer);
            console.log('sent the answer', answer);
            socketRef.current.emit('answer', { roomId: 10, answer: answer });
        } catch (e) {
            console.error(e);
        }
    };

    const MyVideo = useCallback((props) => {
        return <Video ref={myVideoRef} {...props} />;
    }, []);
    const RemoteVideo = useCallback((props) => {
        return <Video ref={remoteVideoRef} {...props} />;
    }, []);

    useEffect(() => {
        socketRef.current = io({
            reconnection: true,
        }); // proxy 설정된 (signal 서버)

        socketRef.current.on('connect', () => {
            console.log(socketRef.current.id); // "G5p5..."
        });

        peerRef.current = new RTCPeerConnection();

        // 기존 유저가 있고, 새로운 유저가 들어왔다면 오퍼생성
        socketRef.current.on('userJoined', ({ userId }) => {
            console.log('userJoined', userId);
            if (userId) {
                createOffer();
            }
        });

        // offer를 전달받은 PeerB만 해당됩니다
        // offer를 들고 만들어둔 answer 함수 실행
        socketRef.current.on('offer', (sdp) => {
            console.log('recv Offer');
            createAnswer(sdp);
        });

        // answer를 전달받을 PeerA만 해당됩니다.
        // answer를 전달받아 PeerA의 RemoteDescription에 등록
        socketRef.current.on('answer', (sdp) => {
            console.log('recv Answer', sdp);
            if (!peerRef.current) {
                return;
            }
            peerRef.current.setRemoteDescription(sdp);
        });

        // 서로의 candidate를 전달받아 등록
        socketRef.current.on('candidate', async ({ candidate }) => {
            if (!peerRef.current) {
                return;
            }
            console.log('candidate', candidate);
            await peerRef.current.addIceCandidate(candidate);
        });

        // 마운트시 해당 방의 roomName을 서버에 전달
        socketRef.current.emit('joinRoom', {
            roomId: 10,
            // userId: undefined,
            // userId: socketRef.current.id,
            userId: sessionStorage.getItem('userId'),
        });

        getMedia();
        console.log('mount', socketRef.current);
        return () => {
            console.log('unmount');
            // 언마운트시 socket disconnect
            if (socketRef.current && socketRef.current.connected) {
                socketRef.current.disconnect();
            }
            if (peerRef.current) {
                peerRef.current.close();
            }
        };
    }, []);

    return (
        <WebRtcContext.Provider
            value={{
                toggleMuteAudio,
                toggleHideVideo,
                MyVideo,
                RemoteVideo,
            }}
        >
            {children}
        </WebRtcContext.Provider>
    );
}
