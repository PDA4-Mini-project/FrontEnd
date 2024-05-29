import CategoryTag from './CategoryTag';
import FuncButton from './FuncButton';

export default function RoomInfoModal(props) {
    const onHide = props.onHide;
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
                    <FuncButton size="sm" text="정원 입장" func={onHide} color="green" />
                    <FuncButton size="sm" text="닫기" func={onHide} />
                </div>
            </div>
        </div>
    );
}
