import Api from "../utils/Api";
import {LOGIN_SUCCESS} from "../constants/login";
import {Toast} from "toaster-js";
import "toaster-js/default.scss";

export const loginAction = (email, password) => {
    let loginSuccessAction = (response) => ( {type: LOGIN_SUCCESS, response} );

    return dispatch => {
        Api.post('/users/login.json', {
                user: {
                    email: email,
                    password: password
                }
            }, {
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }
        ).then(
            response => {
                dispatch(loginSuccessAction(response));
                new Toast("You have successfully logged in!");
            },
            error => {
                console.log(error);
                new Toast("Please provide valid credentials!");
            }
        );
    };
};