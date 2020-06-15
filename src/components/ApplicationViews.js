import { Route, Redirect } from "react-router-dom";
import React from "react"

// Moods
import Welcome from "./Welcome/Welcome"
import Register from "./Register/Register"
import Login from "./Login/Login"
// import Welcome from "./Welcome/Welcome"
// import Welcome from "./Welcome/Welcome"
// import Welcome from "./Welcome/Welcome"
// import Welcome from "./Welcome/Welcome"
// import Welcome from "./Welcome/Welcome"

const ApplicationViews = (props) => {
    // User
    const setUserRegister = props.setUserRegister;
    const setUserLogin = props.setUserLogin;



    return (
        <>
            <Route
                exact
                path="/"
                render={props => {
                    return <Welcome {...props} />;
                }}
            />

            <Route
                exact
                path="/register"
                render={props => {
                    return <Register setUserRegister={setUserRegister} {...props} />;
                }}
            />

            <Route
                exact
                path="/login"
                render={props => {
                    return <Login setUserLogin={setUserLogin} {...props} />;
                }}
            />

        </>
    );
};

export default ApplicationViews;