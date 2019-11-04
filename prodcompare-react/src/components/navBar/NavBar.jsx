import React, {useState} from 'react';
import { useSelector, useDispatch } from "react-redux";


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
          <a href="/" className="navLinks">
						<div className="logo-image">P</div>
					</a>
        </div>

				
        <div className="brand">
          <a href="/">ProdCompare</a>
        </div>
				
				{/* Show favorites or Login modal*/}
				{authenticationData.user && authenticationData.user.email ?
					(<div className="favorites-route">
						<a href="/favorites/">Favorites</a>
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