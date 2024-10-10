import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import logoutIcon from "../../assets/logout.svg";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

const NavbarMenu = () => {
  const { logoutUser } = useContext(AuthContext);

  const logout = async () => await logoutUser();

  return (
    <Navbar expand="lg" bg="primary" variant="dark" className="shadow">
      <Navbar.Brand className="fw-bold text-white">
        <img src={logo} alt="logo" width="32" height="32" className="ms-2" />
        <span className="ms-2">Courses</span>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/dashboard" className="fw-bold text-white">
            Dashboard
          </Nav.Link>
          <Nav.Link as={Link} to="/about" className="fw-bold text-white">
            About
          </Nav.Link>
        </Nav>

        <Nav>
          <Button variant="secondary" className="fw-bold text-white me-3">
            <img
              src={logoutIcon}
              alt="logoutIcon"
              width="32"
              height="32"
              className="me-auto"
              onClick={logout}
            />
            <span className="ms-2">Logout</span>
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarMenu;
