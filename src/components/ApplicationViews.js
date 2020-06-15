import { Route, Redirect } from "react-router-dom";
import React from "react"

// Moods
import Welcome from "./Welcome/Welcome"
import Register from "./Register/Register"
// import Welcome from "./Welcome/Welcome"
// import Welcome from "./Welcome/Welcome"
// import Welcome from "./Welcome/Welcome"

const ApplicationViews = (props) => {
    // User
    const hasUser = props.hasUser;
    const setUser = props.setUser;



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
        </>
    );
};

export default ApplicationViews;