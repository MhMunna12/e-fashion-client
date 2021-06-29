import React from 'react';
import {useContext} from 'react';
import {Navbar,Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import './MenuBar.css';
const MenuBar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="">
            <Navbar className="background"  variant="light">
            <Nav className="mr-auto">
                <h2>E-Fashion</h2>
            </Nav>
                <Nav className="mr-sm-2 ">
                    <Nav.Link as={Link} to="/home">Home</Nav.Link>
                    {loggedInUser.isAdmin && <Nav.Link as={Link} to="/admin">Admin</Nav.Link>}
                    <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>`
                </Nav>
            </Navbar>
        </div>
    );
};

export default MenuBar;