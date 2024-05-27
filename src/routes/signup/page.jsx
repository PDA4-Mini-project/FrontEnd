import { useState } from 'react';
import FormButton from '../../components/FormButton';
import NavBar from '../../components/Navbar';
import { useForm } from 'react-hook-form';
import { Signup } from '../../lib/apis/users';

export default function SignupPage() {
    const common = 'rounded-full border-2 border-[#DBDAD3] w-full h-12 px-4';
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        getValues
    } = useForm();
    const onSubmit = (data) => {
        Signup(data.nickname, data.email, data.id, data.password1).then(data=>console.log(data)).catch(err=>console.log(err.data))
    };

    return (
        <>
            <NavBar />
            <div className="w-[648px] m-auto">
                <div className="text-center mt-6">
                    <p className="font-bold text-3xl mb-6">회원가입</p>
                    <p className="text-[#777771] mb-10">쏙쏙정원에 오신 것을 환영합니다!</p>
                </div>
                <form
                    className="bg-white py-14 px-12 rounded-3xl flex-col space-y-6 justify-items-center"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div>
                        <p>닉네임 *(최대 8글자)</p>
                        <input
                            {...register('nickname', { required: '닉네임을 입력해주세요', maxLength: 8 })}
                            placeholder="닉네임을 입력하세요"
                            className={common}
                        />
                        <p className="text-red-500">{errors?.nickname?.message}</p>
                    </div>
                    <div>
                        <p>이메일 *</p>
                        <input
                            {...register('email', { required: '이메일을 입력해주세요', pattern: /^\S+@\S+$/i })}
                            placeholder="이메일을 입력하세요"
                            className={common}
                        />
                        <p className="text-red-500">{errors?.email?.message}</p>
                    </div>
                    <div>
                        <p>아이디 *</p>
                        <input
                            {...register('id', { required: '아이디를 입력하세요' })}
                            placeholder="아이디를 입력하세요"
                            className={common}
                        />
                        <p className="text-red-500">{errors?.id?.message}</p>
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <p>비밀번호 *</p>
                            <input
                                {...register('password1', { required: '비밀번호를 입력해주세요' })}
                                placeholder="비밀번호"
                                className={common}
                                type='password'
                            />
                            <p className="text-red-500">{errors?.password1?.message}</p>
                        </div>
                        <div>
                            <p>비밀번호 확인 *</p>
                            <input
                                {...register('password2', { required: '비밀번호를 한번 더 입력해주세요', validate: {
                                    check: (val) => {
                                    if (getValues("password1") !== val) {
                                        return "비밀번호가 일치하지 않습니다.";
                                    }
                                    },
                                }, })}
                                placeholder="비밀번호 확인"
                                className={common}
                                type='password'
                            />
                            <p className="text-red-500">{errors?.password2?.message}</p>
                        </div>
                    </div>
                    <FormButton text="회원가입" able={true} />
                </form>
            </div>
        </>
    );
}
