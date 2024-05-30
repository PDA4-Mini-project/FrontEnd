import { useEffect, useState } from 'react';
import NavBar from '../components/Navbar';
import { GetProfile } from '../lib/apis/profile';
import { useDispatch } from 'react-redux';
import { saveProfile, saveReviewScore, saveUserName, saveUserTheme } from '../store/userSlice';
import FuncButton from '../components/FuncButton';
import p1 from '/flowers/lavender.png';
import p2 from '/p2.png';
import no from '/notalent.png';
import { useNavigate } from 'react-router-dom';

export default function MainPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        setUserId(sessionStorage.getItem('userId'));

        if (!userId) {
            return;
        }
        GetProfile(userId)
            .then((data) => {
                console.log(data);
                dispatch(saveUserName(data.userName.userName));
                dispatch(saveProfile(data.profile));
                dispatch(saveReviewScore(data.reviewData.average_score));
                dispatch(saveUserTheme(data.userThemes));
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <NavBar />
            <div className="flex bg-white justify-center py-32 h-[520px] space-x-16">
                <div className="grid content-between">
                    <p className="text-[54px] font-semibold">
                        재능을 나누고 나만의 <br />
                        <span className="text-[#4CAF4F]">꽃을 키워보아요</span>
                    </p>
                    <p className="text-[#717171]">재능의 영역에 따라 다양한 종류의 꽃을 키울 수 있어요</p>
                    <FuncButton text="나만의 꽃이란" color="green" func={() => navigate('/info')} />
                </div>
                <img src={p1} />
            </div>
            <div className="flex justify-center py-32 h-[520px] space-x-12">
                <img src={p2} />
                <div className="grid content-between">
                    <p className="text-[50px] font-semibold">가드너가 되어 재능 기부하기</p>
                    <p className="text-[#717171]">
                        가드너란? <br />
                        자신의 재능을 기부하여 다른 사람의 재능 씨앗을 키워주는 사람을 말해요.
                    </p>
                    <FuncButton text="재능 기부하러 가기" color="green" func={() => navigate('/garden')} />
                </div>
            </div>
            <div className="flex bg-white justify-center py-32 h-[520px] space-x-12">
                <img src={no} />
                <div className="grid content-between">
                    <p className="text-[50px] font-semibold">씨앗이 되어 재능 꽃피우기</p>
                    <p className="text-[#717171]">
                        씨앗이란? <br />
                        재능 기부를 받아 새로운 재능을 꽃피울 사람을 말해요.
                    </p>
                    {userId ? (
                        <FuncButton text="꽃 보러가기" color="green" func={() => navigate('/profile')} />
                    ) : (
                        <FuncButton text="꽃 보러가기" color="green" func={() => navigate('/login')} />
                    )}
                </div>
            </div>
        </div>
    );
}
