import { Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useGetSession } from "../api/authentication";

import LoggedInDropdown from "./LoggedInDropdown"

export function Navigationbar() {
  const { data } = useGetSession();
  return (
    <Navbar bg="light" expand="lg" className="custom-rounded-navbar">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!data?.isAuthenticated &&
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>}
            {data?.isAuthenticated &&
            <Nav.Link as={Link} to="/user-feed">
              Feed
            </Nav.Link>}
            <Nav.Link as={Link} to="/text-analyse">
              Text Analyse
            </Nav.Link>
            {!data?.isAuthenticated &&
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>}
            {!data?.isAuthenticated &&
            <Nav.Link as={Link} to="/new-account">
              New Account
            </Nav.Link>}
          </Nav>
          {data?.isAuthenticated && <LoggedInDropdown email={data.username}></LoggedInDropdown>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigationbar;
