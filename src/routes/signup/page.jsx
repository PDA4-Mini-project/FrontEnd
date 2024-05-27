import { useState } from 'react';
import FormButton from '../../components/FormButton';
import NavBar from '../../components/Navbar';

export default function SignupPage() {
    const common = 'rounded-full border-2 border-[#DBDAD3] w-full h-12 px-4';
    const signupSubmit = () => {};
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    return (
        <>
            <NavBar />
            <div className="w-[648px] m-auto">
                <div className="text-center mt-6">
                    <p className="font-bold text-3xl mb-6">회원가입</p>
                    <p className="text-[#777771] mb-10">쏙쏙정원에 오신 것을 환영합니다!</p>
                </div>
                <form className="bg-white py-14 px-12 rounded-3xl flex-col space-y-6 justify-items-center">
                    <div>
                        <p>닉네임 *</p>
                        <input
                            onChange={(e) => setNickname(e.target.value)}
                            type="text"
                            name="name"
                            id="name"
                            placeholder="닉네임을 입력하세요"
                            className={common}
                        />
                    </div>
                    <div>
                        <p>이메일 *</p>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            name="email"
                            id="email"
                            placeholder="이메일을 입력하세요"
                            className={common}
                        />
                    </div>
                    <div>
                        <p>아이디 *</p>
                        <input
                            onChange={(e) => setId(e.target.value)}
                            type="text"
                            name="id"
                            id="id"
                            placeholder="아이디를 입력하세요"
                            className={common}
                        />
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <p>비밀번호 *</p>
                            <input
                                onChange={(e) => setPassword1(e.target.value)}
                                type="text"
                                name="password1"
                                id="password1"
                                placeholder="비밀번호"
                                className={common}
                            />
                            <p className="text-[#5E5F59]">비밀번호를 입력해주세요</p>
                        </div>
                        <div>
                            <p>비밀번호 확인 *</p>
                            <input
                                onChange={(e) => setPassword2(e.target.value)}
                                type="text"
                                name="password2"
                                id="password2"
                                placeholder="비밀번호 확인"
                                className={common}
                            />
                            <p className="text-[#5E5F59]">비밀번호를 한번 더 입력해주세요</p>
                        </div>
                    </div>
                    <FormButton text="회원가입" able={true} func={signupSubmit} />
                </form>
            </div>
        </>
    );
}
