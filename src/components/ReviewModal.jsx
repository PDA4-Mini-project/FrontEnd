import FuncButton from './FuncButton';
import FormButton from './FormButton';
import { useState } from 'react';
import black from '~/public/흑백꽃.png';
import color from '~/public/컬러꽃.png';
import { useForm } from 'react-hook-form';
import { Toast } from './Toast';
import { makeRate } from '../lib/apis/gardens';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function ReviewModal(props) {
    const onHide = props.onHide;
    const onCancel = props.onCancel;
    // 가드너 아이디 = 방장 아이디
    const reviewId = useSelector((state) => state.garden._id);
    const navigate = useNavigate();
    // 나중에 정원사 정보랑 연결해야함
    const gardener = {
        id: 'ha',
        name: '최대글자가아홉글자',
        imageUrl:
            'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    };

    const [hoveredRating, setHoveredRating] = useState(0);
    const [rating, setRating] = useState(5);

    const handleMouseEnter = (score) => {
        setHoveredRating(score);
    };

    const handleMouseLeave = () => {
        setHoveredRating(0);
    };

    const handleClick = (score) => {
        setRating(score);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const onSubmit = (data) => {
        // const _id = sessionStorage.getItem('userId');
        console.log(rating);
        makeRate(reviewId, rating)
            .then((data) => {
                console.log(data);
                onHide();
                navigate('/garden');
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="z-10 bg-black/30 w-screen h-screen fixed left-0 top-0 flex justify-center items-center">
            <div className="w-[648px] h-fit bg-white py-14 px-28 rounded-3xl grid justify-items-center gap-9">
                <p className="font-bold text-3xl">정원사</p>
                <p>정원사님의 재능기부는 어땠나요?</p>
                <img src={gardener.imageUrl} alt="정원사 사진" className="w-52 h-52 rounded-full" />
                <p className="font-semibold">{gardener.name}</p>
                <form className="grid justify-items-center" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex space-x-3 mb-6">
                        {[...Array(5)].map((_, index) => {
                            const num = index + 1;
                            return (
                                <label key={num}>
                                    <input
                                        type="radio"
                                        {...register('rating', { required: '평점을 선택해주세요' })}
                                        className="hidden"
                                    />
                                    <img
                                        className="w-12 h-12 cursor-pointer"
                                        src={num <= (hoveredRating || rating) ? color : black}
                                        onMouseEnter={() => handleMouseEnter(num)}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={() => handleClick(num)}
                                        alt={`꽃-${num}`}
                                    />
                                </label>
                            );
                        })}
                    </div>
                    <p className="text-red-500 text-center">{errors?.time?.message}</p>
                    <div className="flex space-x-9">
                        <FormButton text="평가 남기기" able={true} />
                        <FuncButton size="sm" text="닫기" func={onCancel} />
                    </div>
                </form>
            </div>
        </div>
    );
}
