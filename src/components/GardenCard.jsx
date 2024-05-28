export default function GardenCard(props) {
    // 나중에 방 정보랑 연결할 예정
    const roomInfo = {
        name: '최대글자가아홉글자',
        image_url:
            'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: '기술',
        time: 30,
        title: '대통령은 국회에 출석하여 발언하거나',
    };
    return (
        <div className="bg-white rounded-3xl w-[500px] py-4 flex justify-center space-x-6">
            <div>
                <img src={roomInfo.image_url} className="w-24 h-24 rounded-full mx-auto mb-3" />
                <p className="font-semibold">{roomInfo.name}</p>
            </div>
            <div className="flex-col my-auto space-y-3">
                <div className="flex space-x-9">
                    <p>{roomInfo.category}</p>
                    <p>{roomInfo.time}분</p>
                </div>
                <p className="font-semibold">{roomInfo.title}</p>
            </div>
        </div>
    );
}
