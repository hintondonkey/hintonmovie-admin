import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  const handleLout = () => {
    localStorage.clear();
    window.location.href = '/'
  }

  const handleLoad = () => {
    window.location.href = '/addmovie'
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/listmovie">Hinton Movie Admin</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/listmovie">Posts</Nav.Link>
              <Nav.Link as={Link} to="" onClick={() => handleLoad()}>Add Movie</Nav.Link>
              <Nav.Link as={Link} to="" className="nav-link" onClick={() => handleLout()} >Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;