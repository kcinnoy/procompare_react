import React, {useContext} from 'react';

import { CurrentUserContext } from "../contexts/CurrentUserContext";

const UserAuthenticator = () => {
    const [currentUser] = useContext(CurrentUserContext);

    return(
        <div></div>
    )
};

export default UserAuthenticator;