import React, {useContext, useState} from 'react';


import './NavBar.scss';
import userIcon from '../user.png'; 


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
          <a href="/" className="navLinks">
						<div className="logo-image">P</div>
					</a>
        </div>

				
        <div className="brand">
          <a href="/">ProdCompare</a>
        </div>
				
				{/* Show favorites or Login modal*/}
				{ currentUser() && currentUser().email ?
					(<div className="favorites-route">
						<a href="/favorites/">Favorites</a>
					</div>) : 
					<LoginModal />
				}

					{/* Show logout or Signup modal*/}
				{ currentUser() && currentUser().email ?
					(<div className="signout-route"><a href="/logout/">Sign out</a></div>) : 
					 <SignUpModal/>
				}		

        { currentUser() && currentUser().email ?
          (<div className="user-container"><img className="user-image" alt="user avatar" src={userIcon}></img></div>) : 
					 ''
        }	
      </div>		
    </div>
            

    )
};

export default NavBar;