import React, {Component} from 'react';
import {Image, Nav, Navbar} from "react-bootstrap";
import "../App.css"
import { Link } from "react-router-dom";

class NavigationBar extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" className="navbar">
                <Link to="/"  className="navbar-brand">
                    <Image src={"https://icons.iconarchive.com/icons/google/noto-emoji-objects/256/62858-closed-book-icon.png"} width={"30"} height={"30"} style={{"marginLeft":"10px"}} /> Book Shop
                </Link>
                    <Nav className="me-auto">
                        <Link to="/book/add" className="nav-link">Add book</Link>
                        <Link to="/book/list" className="nav-link">Book List</Link>
                        <Link to="/user/list" className="nav-link">User List</Link>
                    </Nav>
            </Navbar>
        );
    }
}

export default NavigationBar;