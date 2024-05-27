import { Container } from "react-bootstrap";
import NavBar from "../../components/Navbar";
import { Outlet } from "react-router-dom";

export default function ProfileLayout() {
  return (
    <div>
      <NavBar />
      <Container>
        <Outlet />
      </Container>
    </div>
  )
}