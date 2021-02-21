import React from "react";
import { Navbar, Container } from "react-bootstrap";

const Header = () => {
  return (
    <header>
      <Navbar
        expand="lg"
        className="navbar-dark bg-primary header-nav"
        collapseOnSelect
      >
        <Container>
          <Navbar.Brand
            className="brand-name"
            // style={{ marginLeft: 20 }}
            href="/"
          >
            <Container>xMeme</Container>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
