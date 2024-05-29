import { useForm } from 'react-hook-form';
import { Check2Square, XLg } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { EditName } from '../../lib/apis/profile';
import { saveUserName } from '../../store/userSlice';

export default function NameEdit(props) {
    const onHide = props.onHide;
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        EditName(data.name)
            .then((data) => {
                console.log(data);
                dispatch(saveUserName(data.name));
                onHide();
            })
            .catch((err) => console.log(err));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-between mt-4">
            <input
                {...register('name', { required: '닉네임을 입력해주세요', maxLength: 8 })}
                placeholder={user.name}
                className="rounded-full border-2 border-[#DBDAD3] w-32 h-8 px-4"
            />
            <p className="text-red-500">{errors?.name?.message}</p>
            <button type="submit">
                <Check2Square className="w-6 h-6 hover:cursor-pointer" />
            </button>
            <XLg onClick={onHide} className="w-6 h-6 hover:cursor-pointer" />
        </form>
    );
}
