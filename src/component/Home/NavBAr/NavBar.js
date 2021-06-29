import React from 'react';
import {useContext} from 'react';
import { Nav, Navbar, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import './NavBar.css';
const NavBar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div>
            <Navbar className="d-flex justify-content-between   nav-container" variant="light" expand="lg">
            <h2>E-Fashion</h2>
                <div>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-sm-2 ">
                            <Nav.Link as={Link} to="/home">Home</Nav.Link>
                            {loggedInUser.isAdmin && <Nav.Link as={Link} to="/admin">Admin</Nav.Link>}
                            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>`
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        </div>
    );
};

export default NavBar;