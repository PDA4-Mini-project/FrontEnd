import NavBar from '~/components/Navbar';
import { MicFill, MicMuteFill, CameraVideoFill, CameraVideoOffFill } from 'react-bootstrap-icons';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import adapter from 'webrtc-adapter';
import { Timer } from '../../../components/Timer';
import FuncButton from '../../../components/FuncButton';
import ReviewModal from '../../../components/ReviewModal';
import { useNavigate } from 'react-router-dom';
import { Toast } from '../../../components/Toast';

export default function GardenInsidePage() {
    const [micOn, setMicOn] = useState(true);
    const [cameraOn, setCameraOn] = useState(true);
    const roomId = useSelector((state) => state.garden.roomId);
    const userId = sessionStorage.getItem('userId');
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [peerConnection, setPeerConnection] = useState(null);
    const socket = useRef(null);
    const time = useSelector((state) => state.garden.time);
    const title = useSelector((state) => state.garden.title);
    const [ready, setReady] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        socket.current = io('http://localhost:3000', {
            cors: {
                origin: '*',
            },
        });

        socket.current.on('connect', () => {
            // 방에 참여
            socket.current.emit('joinRoom', { roomId, userId });
        });

        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                setLocalStream(stream);
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }
                startPeerConnection(socket.current, stream);
            })
            .catch((error) => {
                console.error('Error accessing media devices.', error);
            });

        return () => {
            socket.current.disconnect();
        };
    }, [roomId, userId]);

    useEffect(() => {
        if (!socket.current || !peerConnection) return;

        const handleOffer = async (offer) => {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);
            socket.current.emit('answer', { roomId, answer });
        };

        const handleAnswer = async (answer) => {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
        };

        const handleCandidate = async (candidate) => {
            await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        };

        socket.current.on('offer', handleOffer);
        socket.current.on('answer', handleAnswer);
        socket.current.on('candidate', handleCandidate);

        return () => {
            socket.current.off('offer', handleOffer);
            socket.current.off('answer', handleAnswer);
            socket.current.off('candidate', handleCandidate);
        };
    }, [peerConnection, roomId]);

    const startPeerConnection = (socketInstance, stream) => {
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
            if (event.candidate) {
                socketInstance.emit('candidate', { roomId, candidate: event.candidate });
            }
        };

        pc.ontrack = (event) => {
            setRemoteStream(event.streams[0]);
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = event.streams[0];
            }
        };

        stream.getTracks().forEach((track) => {
            pc.addTrack(track, stream);
        });

        // 새로운 참가자에게 offer를 보냄
        if (socketInstance) {
            socketInstance.emit('joinRoom', { roomId, userId });
        }
    };

    const getReady = () => {
        setReady(true);
        // 여기에 서버에 준비했다는 메세지 보내는 로직 추가해야함
    };

    const cancelReady = () => {
        setReady(false);
        // 여기에 서버에 준비 취소했다는 메세지 보내는 로직 추가해야함
    };

    const cancelReview = () => {
        setShowReview(false);
        navigate('/garden');
        Toast.fire('리뷰를 남기지않았어요', '', 'error');
    };

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
                    <div className="bg-white rounded-3xl flex flex-col items-center justify-start">
                        <p className="font-bold text-3xl my-9">{title}</p>
                        {ready ? (
                            <FuncButton text="취소하기" color="green" func={cancelReady} />
                        ) : (
                            <FuncButton text="준비하기" color="green" func={getReady} />
                        )}
                    </div>
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
                <Timer time={1} onTimeEnd={() => setShowReview(true)} />
                <button className="bg-red-600 w-14 h-8 rounded-xl text-white">나가기</button>
            </div>
            {showReview && <ReviewModal onCancel={cancelReview} onHide={() => setShowReview(false)} />}
        </div>
    );
}
