import NavBar from '~/components/Navbar';
import { MicFill } from 'react-bootstrap-icons';
import { MicMuteFill } from 'react-bootstrap-icons';
import { CameraVideoFill } from 'react-bootstrap-icons';
import { CameraVideoOffFill } from 'react-bootstrap-icons';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import adapter from 'webrtc-adapter';
export default function GardenInsidePage() {
    const [micOn, setMicOn] = useState(true);
    const [cameraOn, setCameraOn] = useState(true);
    const roomId = useSelector((state) => state.garden.roomId);
    const localVideoRef = useRef(null);
    const [localStream, setLocalStream] = useState(null);

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                setLocalStream(stream);
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }
            })
            .catch((error) => {
                console.error('Error accessing media devices.', error);
            });
    }, []);
    return (
        <div className="flex flex-col h-dvh">
            <NavBar />
            <div className="bg-main-green w-full grid grid-cols-3 p-5 grow gap-5">
                <div className="bg-white col-span-2">여기 상대 화면</div>
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
