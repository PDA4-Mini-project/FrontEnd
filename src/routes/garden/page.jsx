import { useEffect, useState } from 'react';
import NavBar from '../../components/Navbar';
import GardenCard from '../../components/GardenCard';
import RoomInfoModal from '../../components/RoomInfoModal';
import FuncButton from '../../components/FuncButton';
import GardenCreateModal from '../../components/GardenCreateModal';
import { getGardenList } from '../../lib/apis/gardens';

export default function GardenPage() {
    // 나중에 정원 목록 불러오는 API와 연결해야함
    const [roomList, setRoomList] = useState([]);
    
    ];
    const [infoModal, setInfoModal] = useState(false);
    const [roomNum, setRoomNum] = useState(0);
    const [createModal, setCreateModal] = useState(false);

    useEffect(() => {
        getGardenList().then((data) => {
            console.log(data);
            if (Array.isArray(data)) {
                setRoomList(data);
            } else {
                setRoomList([]);
            }
        });
    }, []);
    return (
        <>
            <NavBar />
            <div>
                <div className="flex justify-end pr-[10%] pb-4">
                    <FuncButton text="정원 만들기" size="sm" color="green" func={() => setCreateModal(true)} />
                </div>
                <div className="grid grid-cols-2 justify-items-center px-14 gap-y-11">
                    {roomList.length === 0
                        ? ' 생성된 정원이 없습니다 '
                        : roomList.map((el, i) => (
                              <div onClick={() => setRoomNum(i)} key={i}>
                                  <GardenCard roomInfo={el} showModal={() => setInfoModal(true)} />
                              </div>
                          ))}
                </div>
                {createModal ? <GardenCreateModal onHide={() => setCreateModal(false)} /> : null}
                {infoModal ? <RoomInfoModal onHide={() => setInfoModal(false)} roomInfo={roomList[roomNum]} /> : null}
            </div>
        </>
    );
}
