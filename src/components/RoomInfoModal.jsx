import CategoryTag from './CategoryTag';
import FuncButton from './FuncButton';
import { useDispatch } from 'react-redux';
import { saveRoomId } from '~/store/gardenSlice';
import { useNavigate } from 'react-router-dom';
import { saveRoomTime, saveRoomTitle } from '../store/gardenSlice';

export default function RoomInfoModal(props) {
    const onHide = props.onHide;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const joinRoom = () => {
        dispatch(saveRoomId(roomInfo.roomId));
        dispatch(saveRoomTime(Number(roomInfo.time)));
        dispatch(saveRoomTitle(roomInfo.title));
        navigate('/garden/inside');
    };
    const roomInfo = props.roomInfo;
    const handleModalClick = (e) => {
        if (e.target === e.currentTarget) {
            onHide();
        }
    };

    return (
        <div
            className="z-10 bg-black/30 w-screen h-screen fixed left-0 top-0 flex justify-center items-center"
            onClick={handleModalClick}
        >
            <div className="w-[648px] h-fit bg-white py-14 px-28 rounded-3xl grid justify-items-center gap-9">
                <div className="flex w-full justify-between items-center">
                    <CategoryTag category={roomInfo.category} />
                    <p className="font-bold text-xl">{roomInfo.title}</p>
                    <p className="font-bold text-xl">{roomInfo.time}분</p>
                </div>

                <div className="flex space-x-9">
                    <FuncButton size="sm" text="정원 입장" func={joinRoom} color="green" />
                    <FuncButton size="sm" text="닫기" func={onHide} />
                </div>
            </div>
        </div>
    );
}
