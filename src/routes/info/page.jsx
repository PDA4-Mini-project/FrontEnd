import NavBar from '../../components/Navbar';
import sun from '/flowers/sun.png';
import iris from '/flowers/iris.png';
import lavender from '/flowers/lavender.png';
import tulip from '/flowers/tulip.png';
import rose from '/flowers/rose.png';
import lotus from '/flowers/lotus.png';
import { useEffect } from 'react';
import { GetProfile } from '../../lib/apis/profile';
import { useDispatch } from 'react-redux';
import { saveProfile, saveReviewScore, saveUserName, saveUserTheme } from '../../store/userSlice';

export default function InfoPage() {
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
                dispatch(saveUserTheme(data.userThemes));
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <NavBar />
            <div className="grid justify-items-center">
                <p className="text-[54px] font-semibold">
                    6가지의 <span className="text-[#4CAF4F]">재능 꽃을</span> 소개합니다
                </p>
                <p className="text-[#717171]">꽃은 재능에 따라 다르게 핍니다</p>
                <div className="my-14 grid gap-[60px]">
                    <div className="grid justify-items-center text-center gap-6">
                        <p className="font-semibold text-[#FEA29D] text-4xl">튤립(기술)</p>
                        <img src={tulip} alt="튤립" className="w-[400px]" />
                        <div className="grid gap-3">
                            <p>&apos;명예&apos;와 &apos;성공&apos;</p>
                            <p>튤립은 다양한 색상과 형태로 기술적 완성도를 상징합니다.</p>
                            <p>
                                기술 정원을 통해 <br />
                                씨앗은 컴퓨터 프로그래밍, 웹 디자인, 데이터 분석 등에서 <br />
                                성공을 추구하며 튤립을 키울 수 있습니다.
                            </p>
                        </div>
                    </div>
                    <div className="grid justify-items-center text-center gap-6">
                        <p className="font-semibold text-[#441961] text-4xl">라벤더(상담)</p>
                        <img src={lavender} alt="라벤더" className="w-[400px]" />
                        <div className="grid gap-3">
                            <p>&apos;위로&apos;와 &apos;평온&apos;</p>
                            <p>라벤더는 심신의 안정을 가져다주는 꽃으로, 상담과 치유의 상징입니다.</p>
                            <p>
                                상담 정원을 통해 <br />
                                씨앗은 위로와 평온을 제공받아 라벤더를 키울 수 있습니다.
                            </p>
                        </div>
                    </div>
                    <div className="grid justify-items-center text-center gap-6">
                        <p className="font-semibold text-[#FFC5CF] text-4xl">연꽃(자기계발)</p>
                        <img src={lotus} alt="연꽃" className="w-[400px]" />
                        <div className="grid gap-3">
                            <p>&apos;청정&apos;과 &apos;재생&apos;</p>
                            <p>연꽃은 어려운 환경에서도 아름답게 피어나는 꽃으로, 개인의 성장과 재생을 상징합니다.</p>
                            <p>
                                자기계발 정원을 통해 <br />
                                씨앗은 시간 관리, 의사소통 기술 등 <br />
                                개인의 발전을 통해 연꽃을 키울 수 있습니다.
                            </p>
                        </div>
                    </div>
                    <div className="grid justify-items-center text-center gap-6">
                        <p className="font-semibold text-[#FE3A52] text-4xl">장미(예술)</p>
                        <img src={rose} alt="장미" className="w-[400px]" />
                        <div className="grid gap-3">
                            <p>&apos;사랑&apos;과 &apos;열정&apos;</p>
                            <p>장미는 다양한 색상과 아름다움으로 예술적 표현의 상징입니다.</p>
                            <p>
                                예술 정원을 통해 <br />
                                씨앗은 창의력과 감성을 배워 장미를 키울 수 있습니다.
                            </p>
                        </div>
                    </div>
                    <div className="grid justify-items-center text-center gap-6">
                        <p className="font-semibold text-[#A0ACEC] text-4xl">아이리스(언어)</p>
                        <img src={iris} alt="아이리스" className="w-[400px]" />
                        <div className="grid gap-3">
                            <p>&apos;지혜&apos;와 &apos;소식&apos;</p>
                            <p>아이리스는 소식을 전하는 신의 전령이라는 의미로, 언어와 소통의 상징입니다.</p>
                            <p>
                                언어 정원을 통해 <br />
                                씨앗은 다양한 외국어를 배우고 <br />
                                언어 능력을 향상시켜 아이리스를 키울 수 있습니다.
                            </p>
                        </div>
                    </div>
                    <div className="grid justify-items-center text-center gap-6">
                        <p className="font-semibold text-[#FC9925] text-4xl">해바라기(생활)</p>
                        <img src={sun} alt="해바라기" className="w-[400px]" />
                        <div className="grid gap-3">
                            <p>&apos;헌신&apos;과 &apos;행복&apos;</p>
                            <p>해바라기는 태양을 향해 항상 자라는 꽃으로, 일상생활에서의 헌신과 행복을 상징합니다.</p>
                            <p>
                                생활 정원을 통해 <br />
                                씨앗은 더 나은 삶을 제공받아 해바라기를 키울 수 있습니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
