import { useState } from 'react';
import NavBar from '../../components/Navbar';
import GardenCard from '../../components/GardenCard';
import RoomInfoModal from '../../components/RoomInfoModal';
import FuncButton from '../../components/FuncButton';

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
        {
            name: '최대글자가아홉글자',
            image_url:
                'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            category: '상담',
            time: 30,
            title: '대통령은 국회에 출석하여 발언하거나',
        },
        {
            name: '최대글자가아홉글자',
            image_url:
                'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            category: '자기계발',
            time: 30,
            title: '대통령은 국회에 출석하여 발언하거나',
        },
        {
            name: '최대글자가아홉글자',
            image_url:
                'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            category: '예술',
            time: 30,
            title: '대통령은 국회에 출석하여 발언하거나',
        },
        {
            name: '최대글자가아홉글자',
            image_url:
                'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            category: '언어',
            time: 30,
            title: '대통령은 국회에 출석하여 발언하거나',
        },
        {
            name: '최대글자가아홉글자',
            image_url:
                'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            category: '생활',
            time: 30,
            title: '대통령은 국회에 출석하여 발언하거나',
        },
    ];
    const [infoModal, setInfoModal] = useState(false);
    const [roomNum, setRoomNum] = useState(0);

    return (
        <>
            <NavBar />
            <div>
                <div className='grid grid-cols-2 justify-items-center px-14 gap-y-11'>
                    <FuncButton text="정원 만들기" />
                    {roomList.map((el, i) => (
                        <div onClick={()=>setRoomNum(i)} key={i}>
                            <GardenCard roomInfo={el} showModal={() => setInfoModal(true)} />
                        </div>
                    ))}
                </div>
                {infoModal ? <RoomInfoModal onHide={() => setInfoModal(false)} roomInfo={roomList[roomNum]} /> : null}
            </div>
        </>
    );
}
