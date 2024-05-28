import { useState } from 'react';
import NavBar from '../../components/Navbar';
import ReviewModal from '../../components/ReviewModal';
import GardenCard from '../../components/GardenCard';

export default function GardenPage() {
    const [modalShow, setModalShow] = useState(false);
    return (
        <>
            <NavBar />
            <button onClick={() => setModalShow(true)}>모달 열려라</button>
            <div>
                <h1>여기서 정원 리스트 보여줄것입니다</h1>
                <GardenCard />
                {modalShow ? <ReviewModal onHide={() => setModalShow(false)} /> : null}
            </div>
        </>
    );
}
