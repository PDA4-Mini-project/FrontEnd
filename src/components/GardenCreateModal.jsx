import { useForm } from 'react-hook-form';
import CategoryTagButton from './CategoryTagButton';
import FuncButton from './FuncButton';
import { useState } from 'react';
import FormButton from './FormButton';

export default function GardenCreateModla(props) {
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
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    const categories = ['기술', '상담', '자기계발', '예술', '언어', '생활'];

    return (
        <div
            className="z-10 bg-black/30 w-screen h-screen fixed left-0 top-0 flex justify-center items-center"
            onClick={handleModalClick}
        >
            <div className="w-[648px] h-fit bg-white py-14 px-16 rounded-3xl grid justify-items-center gap-9">
                <form onSubmit={handleSubmit(onSubmit)}>
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
                    <div className="grid grid-cols-2">
                        <div>
                            <input type="radio" value="30" {...register('time')} />
                            30분
                        </div>
                        <div>
                            <input type="radio" value="60" {...register('time')} />
                            60분
                        </div>
                        <div>
                            <input type="radio" value="90" {...register('time')} />
                            90분
                        </div>
                        <div>
                            <input type="radio" value="120" {...register('time')} />
                            120분
                        </div>
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
