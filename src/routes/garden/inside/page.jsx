import NavBar from '~/components/Navbar';
import { MicFill } from 'react-bootstrap-icons';
import { MicMuteFill } from 'react-bootstrap-icons';
import { CameraVideoFill } from 'react-bootstrap-icons';
import { CameraVideoOffFill } from 'react-bootstrap-icons';
import { useState } from 'react';

export default function GardenInsidePage() {
    const [micOn, setMicOn] = useState(true);
    const [cameraOn, setCameraOn] = useState(true);

    return (
        <div className="flex flex-col h-dvh">
            <NavBar />
            <div className="bg-main-green w-full grid grid-cols-3 p-5 grow gap-5">
                <div className="bg-white col-span-2">여기 상대 화면</div>
                <div className="grid gap-5">
                    <div className="bg-white">여기 나</div>
                    <div className="bg-white rounded-3xl">여기 채팅 보여줄 자리</div>
                </div>
            </div>
            <div className="bg-black h-14 flex justify-between items-center px-4">
                <div className="flex space-x-4">
                    <div onClick={() => setMicOn(!micOn)} className="grid justify-items-center min-w-14">
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
                    <div onClick={() => setCameraOn(!cameraOn)} className="grid justify-items-center">
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
