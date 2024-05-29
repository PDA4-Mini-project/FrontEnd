import { useForm } from 'react-hook-form';
import CategoryTagButton from './CategoryTagButton';
import FuncButton from './FuncButton';
import { useState } from 'react';
import FormButton from './FormButton';
import { createGarden } from '../lib/apis/gardens';
import { useNavigate } from 'react-router-dom';

export default function GardenCreateModal(props) {
    const onHide = props.onHide;
    const handleModalClick = (e) => {
        if (e.target === e.currentTarget) {
            onHide();
        }
    };

    // 방 생성 관련 state들
    const [gardenCategory, setGardenCategory] = useState('');

    const selectCategory = (category) => {
        setGardenCategory(category);
    };

    // 방 생성 폼
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();
    const selectedTime = watch('time');
    const navigate = useNavigate();
    const onSubmit = (data) => {
        const _id = sessionStorage.getItem('userId');
        const { time, title } = data;
        const category = gardenCategory;

        createGarden({ _id, time, title, category }).then((data) => {
            navigate('/garden/inside');
        });
        onHide();
    };

    const categories = ['기술', '상담', '자기계발', '예술', '언어', '생활'];

    return (
        <div
            className="z-10 bg-black/30 w-screen h-screen fixed left-0 top-0 flex justify-center items-center"
            onClick={handleModalClick}
        >
            <div className="w-[648px] h-fit bg-white py-14 px-16 rounded-3xl grid justify-items-center">
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-6">
                    <div className="flex space-x-6">
                        {categories.map((el, i) => (
                            <CategoryTagButton
                                category={el}
                                key={i}
                                selectCategory={selectCategory}
                                gardenCategory={gardenCategory}
                            />
                        ))}
                    </div>
                    <div>
                        <p>정원 이름 *</p>
                        <input
                            {...register('title', { required: '정원 이름을 입력해주세요' })}
                            placeholder="정원 이름을 입력하세요"
                            className="rounded-full border-2 border-[#DBDAD3] w-full h-12 px-4"
                        />
                        <p className="text-red-500">{errors?.title?.message}</p>
                    </div>
                    <div className="grid grid-cols-2 justify-items-center gap-y-3">
                        {['30', '60', '90', '120'].map((value) => (
                            <label key={value} className="flex items-center cursor-pointer">
                                <input type="radio" value={value} {...register('time')} className="hidden" />
                                <div
                                    className={`w-24 h-10 flex items-center justify-center rounded-3xl ${
                                        selectedTime === value ? 'bg-main-green text-white' : 'bg-gray-200'
                                    }`}
                                >
                                    {value}분
                                </div>
                            </label>
                        ))}
                    </div>

                    <div className="flex pr-6">
                        <FormButton text="정원 만들기" able={true} />
                        <FuncButton size="sm" text="닫기" func={onHide} />
                    </div>
                </form>
            </div>
        </div>
    );
}
