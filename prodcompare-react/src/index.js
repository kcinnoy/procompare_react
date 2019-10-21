import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import Favorites from './components/Favorites';
import * as serviceWorker from './serviceWorker';
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import UserAuthenticator from "./utils/UserAuthenticator";
import NavBar from './components/NavBar';
import Logout from './utils/LogOut';

const routing = (
    <CurrentUserProvider>
        <UserAuthenticator />
        <div className="app-container">
            <div className="nav-header">
                <NavBar />
            </div>
            <div className="compare-container">
                {/* <App /> */}
            </div>
            <div className="footer">
            </div>
        </div>
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
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();