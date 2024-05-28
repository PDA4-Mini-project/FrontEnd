import { useState } from 'react';
import { Pencil } from 'react-bootstrap-icons';

export default function ProfilePage() {
    // 더미라서 나중에 유저 정보 받아와서 껴줘야함
    const [user, setUser] = useState({
        name: 'User',
        imageUrl:
            'https://images.unsplash.com/photo-1557555187-23d685287bc3?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        portpolioUrl: 'https://어쩌구저쩌구',
        introduction: '새로운 세상을 만들어가 너와 함께라면 분명 멋질거야',
        reviewScore: 3,
    });

    return (
        <div>
            <div className="bg-white flex justify-center space-x-[15%] py-16">
                <div>
                    <img className="w-52 h-52 rounded-full" src={user.imageUrl} />
                    <div className="flex justify-center mt-4">
                        <p className="text-xl">{user.name}</p>
                        <Pencil />
                    </div>
                </div>
                <div>
                    <p className="text-xl">자기소개</p>
                    <p className="text-xl">{user.introduction}</p>
                    <p className="text-xl">포트폴리오</p>
                    <p className="text-xl">{user.portpolioUrl}</p>
                </div>
            </div>
        </div>
    );
}
