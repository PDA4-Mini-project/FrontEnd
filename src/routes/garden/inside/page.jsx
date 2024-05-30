import NavBar from '~/components/Navbar';
import FuncButton from '../../../components/FuncButton';
import ReviewModal from '../../../components/ReviewModal';
import { MicFill, MicMuteFill, CameraVideoFill, CameraVideoOffFill } from 'react-bootstrap-icons';
import { useState, useMemo, useContext } from 'react';
import { useSelector } from 'react-redux';
import { WebRtcContext } from '~/components/webRtcProvider';
import { useNavigate } from 'react-router-dom';
import { Toast } from '../../../components/Toast';
export default function GardenInsidePage() {
    const [micOn, setMicOn] = useState(true);
    const [cameraOn, setCameraOn] = useState(true);
    const roomId = useSelector((state) => state.garden.roomId);
    const userId = useMemo(() => sessionStorage.getItem('userId'), []);
    const navigate = useNavigate();
    const { MyVideo, RemoteVideo, toggleMuteAudio, toggleHideVideo, handleStatus, isStartEnabled } =
        useContext(WebRtcContext);
    const time = useSelector((state) => state.garden.time);
    const title = useSelector((state) => state.garden.title);
    const [ready, setReady] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const cancelReview = () => {
        setShowReview(false);
        navigate('/garden');
        Toast.fire('리뷰를 남기지않았어요', '', 'error');
    };

    const getReady = () => {
        setReady(true);
        // 여기에 서버에 준비했다는 메세지 보내는 로직 추가해야함
    };

    const cancelReady = () => {
        setReady(false);
        // 여기에 서버에 준비 취소했다는 메세지 보내는 로직 추가해야함
    };

    return (
        <div className="flex flex-col h-dvh">
            <NavBar />
            <div className="bg-main-green w-full grid grid-cols-3 p-5 grow gap-5">
                <div className="bg-white col-span-2">
                    {/* <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full" />
                     */}
                    <RemoteVideo autoPlay playsInline className="w-full h-full" />
                </div>
                <div className="grid gap-5">
                    <div className="bg-white">
                        {/* <video ref={localVideoRef} autoPlay playsInline className="w-full h-full" /> */}
                        <MyVideo autoPlay playsInline className="w-full h-full" />
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
                            toggleMuteAudio();
                            setMicOn(!micOn);
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
                            toggleHideVideo();
                            setCameraOn(!cameraOn);
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
            {showReview && <ReviewModal onCancel={cancelReview} onHide={() => setShowReview(false)} />}
        </div>
    );
}
