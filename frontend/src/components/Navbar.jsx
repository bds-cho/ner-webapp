import { Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useGetSession } from "../api/authentication";
export function Navigationbar() {
  const { data } = useGetSession();

  return (
    <Navbar bg="light" expand="lg" className="custom-rounded-navbar">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/text-analyse">
              Text Analyse
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/new-account">
              New Account
            </Nav.Link>
          </Nav>
          {data?.isAuthenticated && <span>Eingeloggt als {data.username}</span>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigationbar;
