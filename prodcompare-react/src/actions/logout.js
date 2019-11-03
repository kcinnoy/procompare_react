import Api from "../utils/Api";
import {LOGOUT_REQUEST} from "../constants/login";
import {Toast} from "toaster-js";
import "toaster-js/default.scss";

export const logoutAction = (token) => {
    let logoutSuccessAction = () => ( {type: LOGOUT_REQUEST} );

    return dispatch => {
        Api.delete('/users/logout.json', {}, {
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            }
        ).then(response => {
            localStorage.clear();
            dispatch(logoutSuccessAction());
            new Toast("You have successfully logged out!");

        })
    }
};