import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST
} from '../constants/login';

let user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : {};
let token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
const initialState = user ? { loggedIn: true, user, token } : {};

export function loginReducer(state = initialState, action) {
  switch (action.type) {
      case LOGIN_SUCCESS:
          const {user, token} = setToStorage(action.response);
          return {
              loggedIn: true,
              user: user,
              token: token
          };
      case LOGIN_FAILURE:
          return {};
      case LOGOUT_REQUEST:
          return {};
      default:
          return state
  }
}

const setToStorage = (response) => {
  localStorage.setItem('currentUser', JSON.stringify(response.data.current_user));
  localStorage.setItem('token', response.headers.authorization);

  return {user: response.data.current_user, token: response.headers.authorization};
};