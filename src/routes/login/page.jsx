import FormButton from '../../components/FormButton';
import NavBar from '../../components/Navbar';

export default function LoginPage() {
    const common = 'rounded-full border-2 border-[#DBDAD3] w-full h-12 px-4';
    const loginSubmit = () => {};

    return (
        <>
            <NavBar />
            <div className="w-[648px] m-auto">
                <div className="text-center mt-6">
                    <p className="font-bold text-3xl mb-6">로그인</p>
                    <p className="text-[#777771] mb-10">쏙쏙정원에 오신 것을 환영합니다!</p>
                </div>
                <div className="bg-white py-14 px-12 rounded-3xl flex-col space-y-6 justify-items-center">
                    <div>
                        <p>아이디 *</p>
                        <input type="text" name="id" id="id" placeholder="아이디를 입력하세요" className={common} />
                    </div>
                    <div>
                        <p>비밀번호 *</p>
                        <input type="text" name="password1" id="password1" placeholder="비밀번호" className={common} />
                        <p className="text-[#5E5F59]">비밀번호를 입력해주세요</p>
                    </div>

                    <FormButton text="로그인" able={true} func={loginSubmit} />
                </div>
            </div>
        </>
    );
}
