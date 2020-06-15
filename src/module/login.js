import React, { useState } from 'react';


// General API manager, first parameter always the list name in lower case

const loginManager = () => {
    const isAuthenticated = () => sessionStorage.getItem("credentials") !== null;
    const [hasUser, setHasUser] = useState(isAuthenticated())

    // Get the user ID by the email and set credentials including user ID
    const setUserLogin = async (user) => {
        user = await API.getUserId(user.email)
        sessionStorage.setItem("credentials", JSON.stringify(user[0]));
        setHasUser(isAuthenticated());
    };

    // Set the user ID in the register
    const setUserRegister = (user) => {
        sessionStorage.setItem("credentials", JSON.stringify(user[0]));
        setHasUser(isAuthenticated());
    }
}