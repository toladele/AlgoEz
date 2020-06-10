import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavDropdown, Navbar, Nav } from 'react-bootstrap';



const NavBar = () => {
    return (
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand>Algo-Easy</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <Nav.Link href="/">Place Start !</Nav.Link>
                    <Nav.Link href="/">Place Target !</Nav.Link>
                    <NavDropdown title="Path Finding Algorithms" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/PathGrid/PathGrid">Algo1</NavDropdown.Item>
                        <NavDropdown.Item href="/">Algo2</NavDropdown.Item>
                        <NavDropdown.Item href="/">Algo3</NavDropdown.Item>
                        <NavDropdown.Item href="/">Algo4</NavDropdown.Item>
                        <NavDropdown.Item href="/">Algo5</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Sorting Algorithms" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/">Algo1</NavDropdown.Item>
                        <NavDropdown.Item href="/">Algo2</NavDropdown.Item>
                        <NavDropdown.Item href="/">Algo3</NavDropdown.Item>
                        <NavDropdown.Item href="/">Algo4</NavDropdown.Item>
                        <NavDropdown.Item href="/">Algo5</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar