import React, { Component } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

class Navigationbar extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg" className="custom-rounded-navbar">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/text-analyse">Text Analyse</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/new-account">New Account</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Navigationbar;
