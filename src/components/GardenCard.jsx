import CategoryTag from './CategoryTag';
import sample from '/sample.png';

export default function GardenCard(props) {
    // 나중에 방 정보랑 연결할 예정
    const roomInfo = props.roomInfo;
    const showModal = props.showModal;

    return (
        <div
            className="bg-white rounded-3xl w-[500px] py-4 flex justify-center space-x-6 hover:cursor-pointer"
            onClick={showModal}
        >
            <div>
                <img
                    src={roomInfo.image_url != 'null' ? roomInfo.image_url : sample}
                    className="w-24 h-24 rounded-full mx-auto mb-3"
                />
                <p className="font-semibold text-center">{roomInfo.name}</p>
            </div>
            <div className="flex-col my-auto space-y-3">
                <div className="flex space-x-9 items-center">
                    <CategoryTag category={roomInfo.category} />
                    <p>{roomInfo.time}분</p>
                </div>
                <p className="font-semibold">{roomInfo.title}</p>
            </div>
        </div>
    );
}
