import { createContext, useEffect, useRef, forwardRef, useCallback } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Toast } from './Toast';

/**
 * [first user # 1]
 * 1. roomId 받아오기
 * 2. set userMedia to myVideo
 * 3. <server:joinRoom> (roomId)
 */

/**
 * [second user #2]
 * 1. roomId받아오기
 * 2. set UserMedia to myVideo
 * 3. <server:joinRoom> (roomId)
 * 4. (#1 <client:userJoined>)
 */

/**
 * [nth user #n]
 * 1. roomId받아오기
 * 2. set UserMedia to myVideo
 * 3. <server:joinRoom> (roomId)
 * 4. (#n-1 <client:userJoined>)
 */

/**
 * offer -> answer
 * candidate 교환 (양방향): userId와 candidate를 함께.
 */

export const WebRtcContext = createContext({
    toggleMuteAudio: () => {},
    toggleHideVideo: () => {},
    MyVideo: undefined,
    remoteVideo: undefined,
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
    const storedRoomId = useSelector((state) => state.garden.roomId);
    const storedUserId = useSelector((state) => state.user.user.userId);
    const navigate = useNavigate();
    // 미디어 생성
    // 소켓 초기화
    // peerRef초기화
    // 소켓이벤트 등록
    // peerRef이벤트 등록
    // 마지막 addTrack
    // joinRoom
    const toggleMuteAudio = () => {
        const stream = myVideoRef.current?.srcObject;
        if (stream && stream.getAudioTracks().length > 0) {
            const audioTrack = stream.getAudioTracks()[0];
            audioTrack.enabled = !audioTrack.enabled; // 오디오 트랙 상태 토글
            console.log(`Audio track is now ${audioTrack.enabled ? 'unmuted' : 'muted'}.`);
        } else {
            console.error('No audio track available.');
        }
    };

    const toggleHideVideo = () => {
        const stream = myVideoRef.current?.srcObject;
        if (stream && stream.getVideoTracks().length > 0) {
            const videoTrack = stream.getVideoTracks()[0];
            videoTrack.enabled = !videoTrack.enabled; // 비디오 트랙 상태 토글
            console.log(`Video track is now ${videoTrack.enabled ? 'visible' : 'hidden'}.`);
        } else {
            console.error('No video track available.');
        }
    };

    const initSocket = useCallback(() => {
        socketRef.current = io({
            reconnection: true,
            withCredentials: true,
        }); // proxy 설정된 (signal 서버)

        socketRef.current.on('connect', () => {
            console.log('socket connected');
        });
        // offer signal
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
        socketRef.current.on('candidate', ({ candidate }) => {
            console.log('candidate', candidate);
            console.log('HellllooWorld');
            if (!peerRef.current) {
                return;
            }
            peerRef.current.addIceCandidate(candidate);
        });
        socketRef.current.on('disconnect', () => {
            console.log('Socket disconnected');
        });

        socketRef.current.on('userJoined', ({ userId, numClients }) => {
            console.log('userJoined', userId, numClients);
            if (userId) {
                createOffer();
            }
        });

        return () => {
            socketRef.current.off('offer', (sdp) => {
                console.log('recv Offer');
                createAnswer(sdp);
            });
            socketRef.current.off('answer', (sdp) => {
                console.log('recv Answer', sdp);
                if (!peerRef.current) {
                    return;
                }
                peerRef.current.setRemoteDescription(sdp);
            });
            socketRef.current.off('userJoined', ({ userId, numClients }) => {
                console.log('userJoined', userId, numClients);
                if (userId) {
                    createOffer();
                }
            });
            socketRef.current.off('candidate', ({ roomId, candidate }) => {
                if (!peerRef.current) {
                    return;
                }
                console.log('candidate', candidate);
                peerRef.current.addIceCandidate(candidate);
            });
            socketRef.current.disconnect();
        };
    }, []);

    const initPeer = useCallback(() => {
        const configuration = {
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }], // 예제 STUN 서버
        };
        peerRef.current = new RTCPeerConnection(configuration);
    }, []);

    const createOffer = async () => {
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
            socketRef.current.emit('offer', { roomId: storedRoomId, offer: sdp });
        } catch (e) {
            console.error(e);
        }
    };

    const createAnswer = async (sdp) => {
        // sdp : PeerA에게서 전달받은 offer
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
            socketRef.current.emit('answer', { roomId: storedRoomId, answer: answer });
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        async function init() {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });

            if (myVideoRef.current) {
                myVideoRef.current.srcObject = stream;
            }

            initPeer();
            initSocket();

            // peerRef이벤트 등록
            // iceCandidate 이벤트
            peerRef.current.onicecandidate = (e) => {
                if (e.candidate) {
                    if (!socketRef.current) {
                        return;
                    }
                    console.log('recv candidate', e.candidate);
                    console.log(socketRef.current);
                    socketRef.current.emit('candidate', {
                        roomId: storedRoomId,
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

            // 스트림을 peerConnection에 등록
            stream.getTracks().forEach((track) => {
                console.log('addTrack', track);
                if (!peerRef.current) {
                    console.log('연결 미완료');
                    return;
                }
                peerRef.current.addTrack(track, stream);
            });

            // 마운트시 해당 방의 roomName을 서버에 전달
            socketRef.current.emit('joinRoom', {
                roomId: storedRoomId,
                // userId: undefined,
                // userId: socketRef.current.id,
                userId: storedUserId,
            });

            socketRef.current.on('roomFull', () => {
                Toast.fire('이미 진행 중인 정원입니다. 다른 정원을 이용해주세요', '', 'error');
                navigate('/garden');
            });
        }
        init();

        return () => {
            // 언마운트시 socket disconnect
            if (socketRef.current && socketRef.current.connected) {
                socketRef.current.disconnect();
            }
            if (peerRef.current) {
                peerRef.current.close();
            }
        };
        // }
        // stream설정
    }, [initPeer, initSocket, storedRoomId, storedUserId]);

    const MyVideo = useCallback((props) => {
        return <Video ref={myVideoRef} {...props} />;
    }, []);
    const RemoteVideo = useCallback((props) => {
        return <Video ref={remoteVideoRef} {...props} />;
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
