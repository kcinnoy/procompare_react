import React from 'react';
import {Redirect} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";

// import {CurrentUserContext} from "../contexts/CurrentUserContext";

import {Toast} from "toaster-js";
import "toaster-js/default.scss";

import { logoutAction } from "../actions/logout"

const Logout = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.authenticationData.token );

    const logout = () => {
        logoutAction(token)
    };

    return(
        <Redirect to="/" />
    )


};

export default Logout;