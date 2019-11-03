import Api from "../utils/Api"

export const signupAction = (email, password, handleResponse, handleError) => {
    return dispatch => {
        Api.post('/users.json', {
                email: email,
                password: password
            }, {
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }
        ).then(response => {
            handleResponse(response);
        }).catch(error => {
            handleError(error)
        });
    };
};