import { useForm } from 'react-hook-form';
import { Check2Square, XLg } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { EditPorfolioUrl } from '../../lib/apis/profile';
import { savePortfolio } from '../../store/userSlice';
import { useState } from 'react';

export default function PortfolioEdit(props) {
    const onHide = props.onHide;
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const [port, setPort] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        EditPorfolioUrl(data.port, user.userId).then((data) => {
            if (data.status === 201) {
                dispatch(savePortfolio(port));
                onHide();
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-between">
            <input
                {...register('port', { required: '포르폴리오 링크를 입력해주세요' })}
                placeholder={user.portfolio_url}
                className="rounded-full border-2 border-[#DBDAD3] w-56 h-7 px-4"
                onChange={(e) => setPort(e.target.value)}
            />
            <p className="text-red-500">{errors?.name?.message}</p>
            <button type="submit">
                <Check2Square className="w-6 h-6 hover:cursor-pointer" />
            </button>
            <XLg onClick={onHide} className="w-6 h-6 hover:cursor-pointer" />
        </form>
    );
}
