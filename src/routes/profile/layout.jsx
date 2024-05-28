import { Container } from 'react-bootstrap';
import NavBar from '../../components/Navbar';
import { Outlet } from 'react-router-dom';

export default function ProfileLayout() {
    return (
        <div>
            <NavBar />
            <Container className="px-[60px]">
                <Outlet />
            </Container>
        </div>
    );
}
