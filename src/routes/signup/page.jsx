import FormButton from '../../components/FormButton';
import NavBar from '../../components/Navbar';

export default function SignupPage() {
    const common = 'rounded-full border-2 border-[#DBDAD3] w-full h-12 px-4';
    const signupSubmit = () => {};
    return (
        <>
            <NavBar />
            <div className="w-[648px] m-auto">
                <div className="text-center mt-6">
                    <p className="font-bold text-3xl mb-6">회원가입</p>
                    <p className="text-[#777771] mb-10">쏙쏙정원에 오신 것을 환영합니다!</p>
                </div>
                <div className="bg-white py-14 px-12 rounded-3xl flex-col space-y-6 justify-items-center">
                    <div>
                        <p>이름 *</p>
                        <input type="text" name="name" id="name" placeholder="이름을 입력하세요" className={common} />
                    </div>
                    <div>
                        <p>이메일 *</p>
                        <input type="text" name="email" id="email" placeholder="이메일을 입력하세요" className={common} />
                    </div>
                    <div>
                        <p>아이디 *</p>
                        <input type="text" name="id" id="id" placeholder="아이디를 입력하세요" className={common} />
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <p>비밀번호 *</p>
                            <input type="text" name="password1" id="password1" placeholder="비밀번호" className={common} />
                            <p className="text-[#5E5F59]">비밀번호를 입력해주세요</p>
                        </div>
                        <div>
                            <p>비밀번호 확인 *</p>
                            <input type="text" name="password2" id="password2" placeholder="비밀번호 확인" className={common} />
                            <p className="text-[#5E5F59]">비밀번호를 한번 더 입력해주세요</p>
                        </div>
                    </div>
                    <FormButton text="회원가입" able={true} func={signupSubmit} />
                </div>
            </div>
        </>
    );
}
