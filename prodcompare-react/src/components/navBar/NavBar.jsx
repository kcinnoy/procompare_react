import React, {useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import {NavLink} from 'react-router-dom';


import './NavBar.scss';
import userIcon from '../user.png'; 

import LoginModal from "../modals/Login";
import SignUpModal from "../modals/Signup";
// import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {logoutAction} from "../../actions/logout"

const NavBar = () => {
    // const [currentUser, token] = useContext(CurrentUserContext);
    const authenticationData = useSelector(state => state.authenticationData );
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const logout = () => {
      dispatch(logoutAction(authenticationData.token));
    };


    return (
      
    <div className="NavWrapper">
      <div className="nav">
        <div className="logo">
          <NavLink to="/" className="navLinks">
						<div className="logo-image">P</div>
					</NavLink>
        </div>

				
        <div className="brand">
          <NavLink to="/">ProdCompare</NavLink>
        </div>
				
				{/* Show favorites or Login modal*/}
				{authenticationData.user && authenticationData.user.email ?
					(<div className="favorites-route">
						<NavLink to="/favorites/">Favorites</NavLink>
					</div>) : 
					<LoginModal />
				}

					{/* Show logout or Signup modal*/}
          {authenticationData.user && authenticationData.user.email ?
					  (<div className="signout-route"><a onClick={() => logout()} href={null}>Sign out</a></div>) : 
					  <SignUpModal/>
				  }		

          {authenticationData.user && authenticationData.user.email ?
            (<div className="user-container"><img className="user-image" alt="user avatar" src={userIcon}></img></div>) : 
					  null
          }	
      </div>		
    </div>
            

    )
};

export default NavBar;