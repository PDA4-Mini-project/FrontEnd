import NavBar from '~/components/Navbar';
import FuncButton from '../../../components/FuncButton';
import ReviewModal from '../../../components/ReviewModal';
import { MicFill, MicMuteFill, CameraVideoFill, CameraVideoOffFill } from 'react-bootstrap-icons';
import { useState, useMemo, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WebRtcContext } from '~/components/webRtcProvider';
import { useNavigate } from 'react-router-dom';
import { Toast } from '../../../components/Toast';
import { Timer } from '../../../components/Timer';
import { makeRate } from '../../../lib/apis/gardens';
import { GetProfile } from '../../../lib/apis/profile';
import { saveProfile, saveReviewScore, saveUserName, saveUserTheme } from '../../../store/userSlice';
export default function GardenInsidePage() {
    const [micOn, setMicOn] = useState(true);
    const [cameraOn, setCameraOn] = useState(true);
    const roomId = useSelector((state) => state.garden.roomId);
    const userId = useMemo(() => sessionStorage.getItem('userId'), []);
    const navigate = useNavigate();
    const {
        MyVideo,
        RemoteVideo,
        toggleMuteAudio,
        toggleHideVideo,
        ready,
        handleReady,
        isHost,
        handleStart,
        canStart,
    } = useContext(WebRtcContext);
    const time = useSelector((state) => state.garden.time);
    const title = useSelector((state) => state.garden.title);
    const roomMaker = useSelector((state) => state.garden._id);
    const [showReview, setShowReview] = useState(false);
    const cancelReview = () => {
        setShowReview(false);
        makeRate(roomId);
        navigate('/garden');
        Toast.fire('리뷰를 남기지않았어요', '', 'error');
    };

    const getReady = () => {
        handleReady();
        // 여기에 서버에 준비했다는 메세지 보내는 로직 추가해야함
    };

    const cancelReady = () => {
        handleReady();
        // 여기에 서버에 준비 취소했다는 메세지 보내는 로직 추가해야함
    };

    const getStart = () => {
        // 재능 정원 개시!!
        handleStart();
    };

    // 방 만든 사람만 리뷰 모달 볼 수 있도록
    const onTimeEnd = () => {
        if (roomMaker === userId) {
            setShowReview(true);
        } else {
            navigate('/garden');
            Toast.fire('재능 공유가 끝났어요', '', 'success');
        }
    };

    const goToGardenAndRefresh = () => {
        navigate('/garden');
        window.location.reload();
    };

    const dispatch = useDispatch();
    useEffect(() => {
        const userId = sessionStorage.getItem('userId');

        if (!userId) {
            return;
        }
        GetProfile(userId)
            .then((data) => {
                console.log(data);
                dispatch(saveUserName(data.userName.userName));
                dispatch(saveProfile(data.profile));
                dispatch(saveReviewScore(data.reviewData.average_score));
                dispatch(saveUserTheme(data.userThemes));
            })
            .catch((err) => console.log(err));
    }, []);

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
                        {canStart ? (
                            <p className="text-green-500 font-bold text-xl">재능 정원이 열렸습니다!</p>
                        ) : isHost ? (
                            ready ? (
                                <FuncButton text="시작하기" color="green" func={getStart} />
                            ) : (
                                <FuncButton text="가드너를 기다리는 중" color="gray" disabled={true} />
                            )
                        ) : ready ? (
                            <FuncButton text="취소하기" color="gray" func={cancelReady} />
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
                {canStart && <Timer time={20} onTimeEnd={onTimeEnd} />}

                <button className="bg-red-600 w-14 h-8 rounded-xl text-white" onClick={goToGardenAndRefresh}>
                    나가기
                </button>
            </div>
            {showReview && <ReviewModal onCancel={cancelReview} onHide={() => setShowReview(false)} />}
        </div>
    );
}
