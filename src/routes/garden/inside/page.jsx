import NavBar from '~/components/Navbar';
import { MicFill, MicMuteFill, CameraVideoFill, CameraVideoOffFill } from 'react-bootstrap-icons';
import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import adapter from 'webrtc-adapter';

const socket = io();
socket.on('connect', () => {
    console.log('connected');
});

export default function GardenInsidePage() {
    const [micOn, setMicOn] = useState(true);
    const [cameraOn, setCameraOn] = useState(true);
    const roomId = useSelector((state) => state.garden.roomId);
    const userId = useMemo(() => sessionStorage.getItem('userId'), []);
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [peerConnection, setPeerConnection] = useState(null);

    // 1. socket connect
    // 2. joinRoom
    // 3. candidate리스너
    // 4. offet listner
    // 5.
    useEffect(() => {
        console.log('ABAB');
        socket.emit('joinRoom', { roomId, userId });

        // return () => {
        //     socket.current.disconnect();
        // };
    }, [roomId, userId]);

    const startPeerConnection = useCallback((socketInstance, stream) => {
        const configuration = {
            iceServers: [
                {
                    urls: 'stun:stun.l.google.com:19302',
                },
            ],
        };
        const pc = new RTCPeerConnection(configuration);
        setPeerConnection(pc);

        pc.onicecandidate = (event) => {
            console.log('icecandidate');
            if (event.candidate) {
                socketInstance.emit('candidate', { roomId, candidate: event.candidate });
            }
        };

        pc.ontrack = (event) => {
            console.log('onTrack');
            console.log(event);
            setRemoteStream(event.streams[0]);
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = event.streams[0];
            }
        };

        stream.getTracks().forEach((track) => {
            console.log(track);
            pc.addTrack(track, stream);
        });

        pc.onnegotiationneeded = async () => {
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            socket.current.emit('offer', { roomId: roomId, offer }); // 소켓을 통해 offer 전송
        };

        // 새로운 참가자에게 offer를 보냄
        if (socketInstance) {
            socketInstance.emit('joinRoom', { roomId, userId });
        }
    }, []);

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                setLocalStream(stream);
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }
                startPeerConnection(socket, stream);
            })
            .catch((error) => {
                console.error('Error accessing media devices.', error);
            });
    }, [startPeerConnection]);

    useEffect(() => {
        // if (!socket.current || !peerConnection) return;

        const handleOffer = async (offer) => {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);
            socket.emit('answer', { roomId, answer });
        };

        const handleAnswer = async (answer) => {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
        };

        const handleCandidate = async (candidate) => {
            await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        };

        socket.on('offer', handleOffer);
        socket.on('answer', handleAnswer);
        socket.on('candidate', handleCandidate);

        return () => {
            socket.off('offer', handleOffer);
            socket.off('answer', handleAnswer);
            socket.off('candidate', handleCandidate);
        };
    }, [peerConnection, roomId]);

    return (
        <div className="flex flex-col h-dvh">
            <NavBar />
            <div className="bg-main-green w-full grid grid-cols-3 p-5 grow gap-5">
                <div className="bg-white col-span-2">
                    <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full" />
                </div>
                <div className="grid gap-5">
                    <div className="bg-white">
                        <video ref={localVideoRef} autoPlay playsInline className="w-full h-full" />
                    </div>
                    <div className="bg-white rounded-3xl">여기 채팅 보여줄 자리</div>
                </div>
            </div>
            <div className="bg-black h-14 flex justify-between items-center px-4">
                <div className="flex space-x-4">
                    <div
                        onClick={() => {
                            if (localStream) {
                                localStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
                                setMicOn(!micOn);
                            }
                        }}
                        className="grid justify-items-center min-w-14"
                    >
                        {micOn ? (
                            <>
                                <MicFill className="fill-current text-white" />
                                <p className="text-white text-sm">Mute</p>
                            </>
                        ) : (
                            <>
                                <MicMuteFill className="fill-current text-white" />
                                <p className="text-white text-sm">Unmute</p>
                            </>
                        )}
                    </div>
                    <div
                        onClick={() => {
                            if (localStream) {
                                localStream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
                                setCameraOn(!cameraOn);
                            }
                        }}
                        className="grid justify-items-center"
                    >
                        {cameraOn ? (
                            <>
                                <CameraVideoFill className="fill-current text-white" />
                                <p className="text-white text-sm">Stop Video</p>
                            </>
                        ) : (
                            <>
                                <CameraVideoOffFill className="fill-current text-white" />
                                <p className="text-white text-sm">Start Video</p>
                            </>
                        )}
                    </div>
                </div>
                <button className="bg-red-600 w-14 h-8 rounded-xl text-white">나가기</button>
            </div>
        </div>
    );
}
