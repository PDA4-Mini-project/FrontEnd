import { useState } from 'react';
import NavBar from '../../components/Navbar';
import GardenCard from '../../components/GardenCard';
import RoomInfoModal from '../../components/RoomInfoModal';

export default function GardenPage() {
    // 나중에 정원 목록 불러오는 API와 연결해야함
    const roomList = [
        {
            name: '최대글자가아홉글자',
            image_url:
                'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            category: '기술',
            time: 30,
            title: '대통령은 국회에 출석하여 발언하거나',
        },
    ];
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <NavBar />
            <div>
                <h1>여기서 정원 리스트 보여줄것입니다</h1>
                <GardenCard roomInfo={roomList[0]} showModal={() => setShowModal(true)} />
                {showModal ? <RoomInfoModal onHide={() => setShowModal(false)} roomInfo={roomList[0]} /> : null}
            </div>
        </>
    );
}
