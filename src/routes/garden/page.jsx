import { useEffect, useState } from 'react';
import NavBar from '../../components/Navbar';
import GardenCard from '../../components/GardenCard';
import RoomInfoModal from '../../components/RoomInfoModal';
import FuncButton from '../../components/FuncButton';
import GardenCreateModal from '../../components/GardenCreateModal';
import { getGardenList } from '../../lib/apis/gardens';
import { useNavigate } from 'react-router-dom';
import { Toast } from '../../components/Toast';
import { GetProfile } from '../../lib/apis/profile';
import { useDispatch } from 'react-redux';
import { saveProfile, saveReviewScore, saveUserName, saveUserTheme } from '~/store/userSlice';
import nogarden from '/nogarden.png';

export default function GardenPage() {
    // 나중에 정원 목록 불러오는 API와 연결해야함
    const [roomList, setRoomList] = useState([]);

    const [infoModal, setInfoModal] = useState(false);
    const [roomNum, setRoomNum] = useState(0);
    const [createModal, setCreateModal] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');

        if (!userId) {
            Toast.fire('로그인 후 이용해주세요', '', 'error');
            navigate('/login');
            return;
        }

        getGardenList().then((data) => {
            if (Array.isArray(data)) {
                const filteredAndSortedRooms = data
                    .filter((room) => room.user_cnt > 0 && room.user_cnt < 3)
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // createdAt 기준으로 정렬
                setRoomList(filteredAndSortedRooms);
            } else {
                setRoomList([]);
            }
        });

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
        <>
            <NavBar />
            <div>
                <div className="flex justify-end pr-[10%] pb-4">
                    <FuncButton text="정원 만들기" size="sm" color="green" func={() => setCreateModal(true)} />
                </div>
                {roomList.length === 0 ? (
                    <div className="flex justify-center h-[500px] relative">
                        <p className="font-bold text-2xl absolute top-9">&nbsp; &nbsp; &nbsp;아직 정원이 없습니다</p>
                        <img src={nogarden} />
                    </div>
                ) : (
                    roomList.map((el, i) => (
                        <div className="grid grid-cols-2 justify-items-center px-14 gap-y-11" key={i}>
                            <div onClick={() => setRoomNum(i)}>
                                <GardenCard roomInfo={el} showModal={() => setInfoModal(true)} />
                            </div>
                        </div>
                    ))
                )}
                {createModal ? <GardenCreateModal onHide={() => setCreateModal(false)} /> : null}
                {infoModal ? <RoomInfoModal onHide={() => setInfoModal(false)} roomInfo={roomList[roomNum]} /> : null}
            </div>
        </>
    );
}
