import React, {useState, createContext} from "react";

export const CurrentUserContext = createContext();

export const currentUser =() => {
    if(localStorage.currentUser)
        return JSON.parse(localStorage.currentUser)
};

export const CurrentUserProvider = (props) => {
    const [token, setToken] = useState();
    const children = props.children;

    return(
        <CurrentUserContext.Provider value={[currentUser, token, setToken]}>
            {children}
        </CurrentUserContext.Provider>
    )
};