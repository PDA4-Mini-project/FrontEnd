import { useEffect } from 'react';
import NavBar from '../components/Navbar';
import { GetProfile } from '../lib/apis/profile';
import { useDispatch } from 'react-redux';
import { saveProfile, saveReviewScore, saveUserName } from '../store/userSlice';

export default function MainPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');

        if (!userId) {
            return;
        }
        GetProfile(userId)
            .then((data) => {
                console.log(data);
                dispatch(saveUserName(data.userName.userName));
                dispatch(saveProfile(data.profile));
                dispatch(saveReviewScore(data.reviewData.average_score));
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <NavBar />
            <h1>여기가 랜딩페이지가 될 것입니다</h1>
        </div>
    );
}
