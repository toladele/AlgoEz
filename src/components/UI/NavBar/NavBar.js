import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';



const NavBar = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-center">
                <Nav>
                    <Navbar.Brand>ALGO-EASY</Navbar.Brand>
                    {/* <Nav.Link href="/">Place Start !</Nav.Link>
                    <Nav.Link href="/">Place Target !</Nav.Link>
                    <Nav.Link href="/">Place Target !</Nav.Link>
                    <Nav.Link href="/">Place Target !</Nav.Link>
                    <NavDropdown title="Path Finding Algorithms" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/PathGrid/PathGrid">Dijkstra</NavDropdown.Item>
                        <NavDropdown.Item href="/">BFS</NavDropdown.Item>
                        <NavDropdown.Item href="/">DFS</NavDropdown.Item>
                        <NavDropdown.Item href="/">Greedy</NavDropdown.Item>
                        <NavDropdown.Item href="/">A*</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Sorting Algorithms" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/BarSort/BarSort">Quick</NavDropdown.Item>
                        <NavDropdown.Item href="/">Merge</NavDropdown.Item>
                        <NavDropdown.Item href="/">Heap</NavDropdown.Item>
                        <NavDropdown.Item href="/">Bubble</NavDropdown.Item>
                        <NavDropdown.Item href="/">Binary</NavDropdown.Item>
                    </NavDropdown> */}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar