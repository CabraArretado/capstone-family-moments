import { Route, Redirect, Link } from "react-router-dom";
import React from "react"

// Moods
import Welcome from "./Welcome/Welcome"
import Register from "./Register/Register"
import Login from "./Login/Login"
import HomeClean from "./HomeClean/HomeClean"
import RegisterEvent from "./RegisterEvent/RegisterEvent"
import JoinEvent from "./JoinEvent/JoinEvent"
// import Welcome from "./Welcome/Welcome"
// import Welcome from "./Welcome/Welcome"

const ApplicationViews = (props) => {
    // User
    const setUser = props.setUser;
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
                    return <Register setUser={setUser} {...props} />;
                }}
            />

            <Route
                exact
                path="/login"
                render={props => {
                    return <Login setUserLogin={setUserLogin} {...props} />;
                }}
            />

            <Route
                exact
                path="/registerevent"
                render={props => {
                    return <RegisterEvent {...props} />;
                }}
            />

{/* TESTE PAGE */}
            <Route
                exact
                path="/tests"
                render={props => {
                    return <JoinEvent {...props} />;
                }}
            />
        </>
    );
};

export default ApplicationViews;