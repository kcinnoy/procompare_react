import { combineReducers } from 'redux';

import { loginReducer } from './loginReducer';

const rootReducer = combineReducers({
    authenticationData: loginReducer
});

export default rootReducer;