import React, {useContext, useState} from 'react';


import './NavBar.scss';

import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";
import LoginModal from "../modals/Login";
import SignUpModal from "../modals/Signup";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

const NavBar = () => {
    const [currentUser, token] = useContext(CurrentUserContext);

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
      
    <div className="NavWrapper">
      <div className="nav">
        <div className="logo">
          <a href="#" className="navLinks"></a>
        </div>

				
        <div className="brand">
          <a href="#" className="navLinks">prodCompare</a>
        </div>
				
				{/* Show favorites or Login modal*/}
				{ currentUser() && currentUser().email ?
					(<div>
						<a href="/favorites/">FAVORITES</a>
					</div>) : 
					<LoginModal />
				}

					{/* Show logout or Signup modal*/}
				{ currentUser() && currentUser().email ?
					(<div><a href="/logout/">Log out</a></div>) : 
					 <SignUpModal/>
				}		

      </div>
			<div className="gradient-border"></div>
    </div>
            

    )

        
        //     <Navbar color="light" light expand="md">
        //     <NavbarBrand href="/">Product Compare</NavbarBrand>
        //     <NavbarToggler onClick={toggle}/>
        //     <Collapse isOpen={isOpen} navbar>
        //         <Nav className="ml-auto" navbar>
        //             { currentUser() && currentUser().email ?
        //                 (
        //                     <NavItem>
        //                         <NavLink href="/favorites/">Favorites</NavLink>
        //                     </NavItem>
        //                 ) : null }
        //             <NavItem>
        //                 {currentUser() && currentUser().email ?
        //                     (
        //                         <NavLink href="/profile/">{currentUser.email}</NavLink>

        //                     )
        //                     : <LoginModal />}
        //             </NavItem>
        //             { currentUser() && currentUser().email ?
        //                 (
        //                     <NavItem>
        //                         <NavLink href="/logout/">Sign Out</NavLink>
        //                     </NavItem>
        //                 ) : (
        //                 <NavItem>
        //                     <SignUpModal/>
        //                 </NavItem>
        //             ) }

        //         </Nav>
        //     </Collapse>
        // </Navbar>
   
};

export default NavBar;