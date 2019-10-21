import React, {useContext} from 'react';

import {CurrentUserContext} from "../contexts/CurrentUserContext";

import {Redirect} from 'react-router-dom';
import Api from "./api";
import {Toast} from "toaster-js";
import "toaster-js/default.scss";

const Logout = () => {
    const [currentUser, token, setToken] = useContext(CurrentUserContext);

    const logout = async () => {
        await Api.delete('/users/logout.json', {}, {
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
            }
        ).then(response => {
            localStorage.clear();
            setToken(null);
            new Toast("You have successfully logged out!");

        })
    };

    logout();

    return(
        <Redirect to="/" />
    )


};

export default Logout;