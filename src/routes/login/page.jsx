import { useForm } from 'react-hook-form';
import FormButton from '../../components/FormButton';
import NavBar from '../../components/Navbar';
import { Login } from '../../lib/apis/users';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const common = 'rounded-full border-2 border-[#DBDAD3] w-full h-12 px-4';
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        Login(data.id, data.password)
            .then((data) => {
                if (data.message === 'login successful') {
                    navigate('/');
                }
            })
            .catch((err) => console.log(err));
    };
    const navigate = useNavigate();

    return (
        <>
            <NavBar />
            <div className="w-[648px] m-auto">
                <div className="text-center mt-6">
                    <p className="font-bold text-3xl mb-6">로그인</p>
                    <p className="text-[#777771] mb-10">쏙쏙정원에 오신 것을 환영합니다!</p>
                </div>
                <form
                    className="bg-white py-14 px-12 rounded-3xl flex-col space-y-6 justify-items-center"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div>
                        <p>아이디 *</p>
                        <input
                            {...register('id', { required: '아이디를 입력해주세요' })}
                            placeholder="아이디을 입력하세요"
                            className={common}
                        />
                        <p className="text-red-500">{errors?.id?.message}</p>
                    </div>
                    <div>
                        <p>비밀번호 *</p>
                        <input
                            {...register('password', { required: '비밀번호를 입력해주세요' })}
                            placeholder="비밀번호"
                            className={common}
                            type="password"
                        />
                        <p className="text-red-500">{errors?.password?.message}</p>
                    </div>

                    <FormButton text="로그인" able={true} />
                </form>
            </div>
        </>
    );
}
