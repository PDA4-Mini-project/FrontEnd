import { Pencil } from 'react-bootstrap-icons';
import black from '~/public/흑백꽃.png';
import color from '~/public/컬러꽃.png';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import NameEdit from '~/components/profileEdit/NameEdit';

export default function ProfilePage() {
    const user = useSelector((state) => state.user.user);
    const common = 'w-12 h-12';
    const [nameEdit, setNameEdit] = useState(false);

    const reviewScores = (score) => {
        const scores = [];
        // 이미지 저장 기능
        for (let i = 0; i < 5; i++) {
            // 현재 인덱스 i와 평점을 비교
            if (i < Math.floor(score)) {
                // 현재 인덱스가 평점 미만이면 oneBean
                scores.push(<img key={i} src={color} alt="꽃" className={common} />);
            } else {
                scores.push(<img key={i} src={black} alt="빈 꽃" className={common} />);
            }
        }
        return scores;
    };

    return (
        <div>
            <div className="bg-white flex justify-center space-x-[15%] py-16 mt-12">
                <div>
                    <img className="w-52 h-52 rounded-full" src={user.image_url} />
                    {nameEdit ? (
                        // <button onClick={() => setNameEdit(false)}>수정완료</button>
                        <NameEdit onHide={() => setNameEdit(false)} />
                    ) : (
                        <div className="flex justify-center mt-4 space-x-2">
                            <p className="text-xl">{user.name}</p>
                            <Pencil className="my-auto hover:cursor-pointer" onClick={() => setNameEdit(true)} />
                        </div>
                    )}
                </div>
                <div className="grid">
                    <div className="flex space-x-3">{reviewScores(user.review_score)}</div>
                    <p className="text-xl">자기소개</p>
                    <p className="text-xl">{user.introduction}</p>
                    <p className="text-xl">포트폴리오</p>
                    <p className="text-xl">{user.portfolio_url}</p>
                </div>
            </div>
        </div>
    );
}
