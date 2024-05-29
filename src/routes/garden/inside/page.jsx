import NavBar from '~/components/Navbar';

export default function GardenInsidePage() {
    return (
        <div className="flex flex-col h-dvh">
            <NavBar />
            <div className="bg-main-green w-full grid grid-cols-3 p-5 grow gap-5">
                <div className="bg-white col-span-2">여기 상대 화면</div>
                <div className="grid gap-5">
                    <div className="bg-white">여기 나</div>
                    <div className="bg-white rounded-3xl">여기 채팅 보여줄 자리</div>
                </div>
            </div>
            <div className="bg-black h-14">
                <button className="bg-red-600">나가기</button>
            </div>
        </div>
    );
}
