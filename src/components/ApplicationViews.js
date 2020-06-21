import { Route, Redirect, Link } from "react-router-dom";
import React from "react"

// Moods
import Welcome from "./Welcome/Welcome"
import Register from "./Register/Register"
import Login from "./Login/Login"
import HomeClean from "./HomeClean/HomeClean"
import RegisterEvent from "./RegisterEvent/RegisterEvent"
import JoinEvent from "./JoinEvent/JoinEvent"
import RegisterParticipation from "./JoinEvent/RegisterParticipation.js"
// import Welcome from "./Welcome/Welcome"
// import Welcome from "./Welcome/Welcome"

const ApplicationViews = (props) => {
    const hasUser = props.hasUser;
    const setUser = props.setUser;
    const setEventId = props.setEventId;
    const hasEvent = props.hasEvent;


    return (
        <>
            <Route
                exact
                path="/"
                render={props => {
                    if (!!hasUser) {
                        return <Redirect to="/home" />
                    } else {
                        return <Welcome {...props} />;
                    }
                }}
            />

            <Route
                exact
                path="/register"
                render={props => {
                    if (!!hasUser) {
                        return <Redirect to="/home" />
                    } else {
                        return <Register setUser={setUser} {...props} />;
                    }
                }}
            />

            <Route
                exact
                path="/login"
                render={props => {
                    if (!!hasUser) {
                        return <Redirect to="/home" />
                    } else {
                        return <Login setUserLogin={setUser} {...props} />;
                    }
                }}
            />

            <Route
                exact
                path="/home"
                render={props => {
                    // no user
                    if (!hasUser) {
                        return <Redirect to="/welcome" />;
                    }
                    // No event
                    if (!hasEvent) {
                        return <HomeClean {...props} />
                    }
                    // user and event
                    if (hasUser && hasEvent) {
                        //TODO
                    }
                }}
            />

            <Route
                exact
                path="/searchevent"
                render={props => {
                    return <JoinEvent setEventId={setEventId}{...props} />;
                }}
            />

            <Route
                exact
                path="/registerevent"
                render={props => {
                    return <RegisterEvent setEventId={setEventId}{...props} />;
                }}
            />

            {/* TESTE PAGE */}
            <Route
                exact
                path="/tests"
                render={props => {
                    return <RegisterParticipation {...props} />;
                }}
            />
        </>
    );
};

export default ApplicationViews;