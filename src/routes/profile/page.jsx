import { Pencil } from 'react-bootstrap-icons';
import black from '~/public/흑백꽃.png';
import color from '~/public/컬러꽃.png';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import NameEdit from '~/components/profileEdit/NameEdit';
import IntroEdit from '../../components/profileEdit/IntroEdit';
import PortfolioEdit from '../../components/profileEdit/PortfolioEdit';
import TalentFlowers from '../../components/TalentFlowers';
import sample from '/sample.png';
import { CameraFill } from 'react-bootstrap-icons';
import { useForm } from 'react-hook-form';
import { EditProfileImage, GetProfile } from '../../lib/apis/profile';
import { saveImageUrl, saveProfile, saveReviewScore, saveUserName, saveUserTheme } from '../../store/userSlice';

export default function ProfilePage() {
    const user = useSelector((state) => state.user.user);
    const common = 'w-12 h-12';
    const [nameEdit, setNameEdit] = useState(false);
    const [introEdit, setIntroEdit] = useState(false);
    const [portEdit, setPortEdit] = useState(false);
    const [imageEdit, setImageEdit] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const [preview, setPreview] = useState('');
    const avatar = watch('image');

    const onSubmit = () => {
        console.log('1');
        if (avatar && avatar.length > 0) {
            console.log('2');
            const file = avatar[0];
            EditProfileImage(user.userId, URL.createObjectURL(file).slice(5)).then((data) => {
                console.log(data);
                if (data.statue === 201) {
                    dispatch(saveImageUrl(URL.createObjectURL(preview)).slice(5));
                    setImageEdit(false);
                }
            });
        }
    };

    const cancleImage = () => {
        setImageEdit(false);
        setPreview('');
    };

    useEffect(() => {
        if (avatar && avatar.length > 0) {
            const file = avatar[0];
            setPreview(URL.createObjectURL(file));
        }
    }, [avatar]);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');

        if (!userId) {
            return;
        }
        GetProfile(userId)
            .then((data) => {
                // console.log(data);
                dispatch(saveUserName(data.userName.userName));
                dispatch(saveProfile(data.profile));
                dispatch(saveReviewScore(data.reviewData.average_score));
                dispatch(saveUserTheme(data.userThemes));
            })
            .catch((err) => console.log(err));
    }, []);

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

    let displayImage;
    if (imageEdit) {
        displayImage = preview ? preview : user.image_url != 'null' ? user.image_url : sample;
    } else {
        displayImage = user.image_url != 'null' ? user.image_url : sample;
    }

    return (
        <div>
            <div className="bg-white flex justify-center space-x-[12%] py-16 mt-12">
                <div>
                    <div className="relative w-52 h-52">
                        <img className="w-52 h-52 rounded-full" src={displayImage} />
                        {/* <form onSubmit={handleSubmit(onSubmit)}>
                            <div
                                className="absolute bottom-0 right-0 rounded-full bg-black w-9 h-9 flex justify-center items-center hover:cursor-pointer"
                                onClick={() => {
                                    setImageEdit(true);
                                    document.getElementById('picture').click();
                                }}
                            >
                                <input
                                    {...register('image')}
                                    name="image"
                                    id="picture"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                />
                                <CameraFill className="w-6 h-6 fill-current text-white" />
                            </div>
                            {imageEdit && (
                                <div>
                                    <button type="submit">변경</button>
                                    <button onClick={cancleImage}>취소</button>
                                </div>
                            )}
                        </form> */}
                    </div>
                    {nameEdit ? (
                        <NameEdit onHide={() => setNameEdit(false)} />
                    ) : (
                        <div className="flex justify-center mt-4 space-x-2">
                            <p className="text-xl">{user.name}</p>
                            <Pencil className="my-auto hover:cursor-pointer" onClick={() => setNameEdit(true)} />
                        </div>
                    )}
                </div>
                <div className="grid content-between">
                    <div className="flex space-x-3">{reviewScores(user.review_score)}</div>
                    <div>
                        <p className="text-xl mb-3">자기소개</p>
                        {introEdit ? (
                            <IntroEdit onHide={() => setIntroEdit(false)} />
                        ) : (
                            <div className="flex items-center justify-between">
                                <p className="text-xl">{user.introduction}</p>
                                <Pencil
                                    className="my-auto hover:cursor-pointer w-5 h-5"
                                    onClick={() => setIntroEdit(true)}
                                />
                            </div>
                        )}
                    </div>
                    <div>
                        <p className="text-xl mb-3">포트폴리오</p>
                        {portEdit ? (
                            <PortfolioEdit onHide={() => setPortEdit(false)} />
                        ) : (
                            <div className="flex items-center justify-between">
                                <p className="text-xl">{user.portfolio_url}</p>
                                <Pencil
                                    className="my-auto hover:cursor-pointer w-5 h-5"
                                    onClick={() => setPortEdit(true)}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <TalentFlowers />
        </div>
    );
}
