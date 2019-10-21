import React, {useContext, useState} from 'react';

import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";
import LoginModal from "../modals/login";
import SignUpModal from "../modals/signup";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const NavBar = () => {
    const [currentUser, token] = useContext(CurrentUserContext);

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Product Compare</NavbarBrand>
            <NavbarToggler onClick={toggle}/>
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    { currentUser() && currentUser().email ?
                        (
                            <NavItem>
                                <NavLink href="/favorites/">Favorites</NavLink>
                            </NavItem>
                        ) : null }
                    <NavItem>
                        {currentUser() && currentUser().email ?
                            (
                                <NavLink href="/profile/">{currentUser.email}</NavLink>

                            )
                            : <LoginModal />}
                    </NavItem>
                    { currentUser() && currentUser().email ?
                        (
                            <NavItem>
                                <NavLink href="/logout/">Sign Out</NavLink>
                            </NavItem>
                        ) : (
                        <NavItem>
                            <SignUpModal/>
                        </NavItem>
                    ) }

                </Nav>
            </Collapse>
        </Navbar>
    );
};

export default NavBar;