import { useState } from 'react';
import NavBar from '../../components/Navbar';
import ReviewModal from '../../components/ReviewModal';

export default function GardenPage() {
    const [modalShow, setModalShow] = useState(false);
    return (
        <>
            <NavBar />
            <div>
                <h1>여기서 정원 리스트 보여줄것입니다</h1>
                <ReviewModal show={modalShow} onHide={() => setModalShow(false)} />
            </div>
        </>
    );
}
