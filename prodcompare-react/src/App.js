import React, {useContext, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home";

const App = () => {
    return (
        <div>
                <div className="container-fluid">
                    <header className="App-header">
                        <Home />
                    </header>
                </div>
            </div>
    );
};

export default App;
