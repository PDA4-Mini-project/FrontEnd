import { Link } from 'react-router-dom';
import logo from '../../public/Logo.svg';
import NavButton from './NavButton';

export default function NavBar() {
    return (
        <div className="flex justify-between mx-32 my-6">
            <img src={logo} />
            <div className="flex gap-12">
                <Link to="/garden">정원</Link>
                <Link>꽃설명</Link>
            </div>
            <div className="flex gap-3">
                <NavButton text="Login" color="white" naviLink="/login" />
                <NavButton text="Signup" color="green" naviLink="/signup" />
            </div>
        </div>
    );
}
