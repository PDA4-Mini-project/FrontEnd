import { Link, useNavigate } from 'react-router-dom';
import logo from '../../public/Logo.svg';
import NavButton from './NavButton';
import { useEffect, useState } from 'react';
import { PersonCircle } from 'react-bootstrap-icons';
import { Logout, getUserBottleCnt } from '../lib/apis/users';
import { useSelector } from 'react-redux';
import bottle from '/bottle.png';

export default function NavBar() {
    const [userId, setUserId] = useState('');
    const [bottleCnt, setBottleCnt] = useState(0);
    const user = useSelector((state) => state.user.user);
    const logout = () => {
        Logout().then((data) => {
            if (data.status === 200) {
                sessionStorage.clear();
                setUserId('');
                navigate('/');
            }
        });
    };

    useEffect(() => {
        setUserId(sessionStorage.getItem('userId'));
    }, []);
    useEffect(() => {
        const userIdForBottle = sessionStorage.getItem('userId');
        getUserBottleCnt(userIdForBottle).then((data) => setBottleCnt(data.data.bottle_count));
    }, []);

    const navigate = useNavigate();

    return (
        <div className="flex justify-between items-center mx-32 my-6">
            <img src={logo} onClick={() => navigate('/')} className="hover:cursor-pointer" />
            <div className="flex gap-12">
                <Link to="/garden">정원</Link>
                <Link to="/info">꽃설명</Link>
            </div>
            <div>
                {userId ? (
                    <div className="flex gap-3 items-center">
                        <div onClick={logout} className="flex items-center">
                            <div
                                className="bg-main-green text-white hover:bg-white hover:text-black w-20 rounded-md flex justify-center items-center hover:cursor-pointer"
                                onClick={logout}
                            >
                                <span>Logout</span>
                            </div>
                        </div>
                        <div className="grid justify-items-center">
                            <PersonCircle
                                className="w-7 h-7 fill-current text-main-green hover:cursor-pointer"
                                onClick={() => navigate('/profile')}
                            />
                            <span>{user.name}님</span>
                        </div>
                        <div className="grid justify-items-center">
                            <img src={bottle} className="w-7 h-7" />
                            <span> X {bottleCnt}</span>
                        </div>
                    </div>
                ) : (
                    <div className="flex gap-3">
                        <NavButton text="Login" color="white" naviLink="/login" />
                        <NavButton text="Signup" color="green" naviLink="/signup" />
                    </div>
                )}
            </div>
        </div>
    );
}
