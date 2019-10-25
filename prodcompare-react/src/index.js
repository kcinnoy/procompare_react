import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';


import App from './components/App';
import Favorites from './components/favorites/Favorites';
import Logout from './utils/LogOut';

import * as serviceWorker from './serviceWorker';
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import UserAuthenticator from "./utils/UserAuthenticator";

const routing = (
    <CurrentUserProvider>
        <UserAuthenticator />
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route exact path="/products" component={App} />
            <Route exact path="/favorites" component={Favorites} />
            <Route exact path="/logout" component={Logout} />
        </div>
    </Router>
    </CurrentUserProvider>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWAa

serviceWorker.unregister();