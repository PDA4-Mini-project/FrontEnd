import { Link, useNavigate } from 'react-router-dom';
import logo from '../../public/Logo.svg';
import NavButton from './NavButton';
import { useEffect, useState } from 'react';
import { PersonCircle } from 'react-bootstrap-icons';

export default function NavBar() {
    const [userId, setUserId] = useState('');
    useEffect(() => {
        setUserId(sessionStorage.getItem('userId'));
    }, []);
    const navigate = useNavigate();

    return (
        <div className="flex justify-between items-center mx-32 my-6">
            <img src={logo} />
            <div className="flex gap-12">
                <Link to="/garden">정원</Link>
                <Link>꽃설명</Link>
            </div>
            <div>
                {userId ? (
                    <div className="flex gap-3">
                        <NavButton text="Logout" color="green" naviLink="/signup" />
                        <PersonCircle
                            className="w-10 h-10 fill-current text-main-green hover:cursor-pointer"
                            onClick={() => navigate('/profile')}
                        />
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
