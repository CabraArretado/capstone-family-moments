import { Route, Redirect, Link } from "react-router-dom";
import React, { useState } from "react"

// Moods
import Welcome from "./Welcome/Welcome"
import Register from "./Register/Register"
import Login from "./Login/Login"
import HomeClean from "./HomeClean/HomeClean"
import RegisterEvent from "./RegisterEvent/RegisterEvent"
import JoinEvent from "./JoinEvent/JoinEvent"
import WaitingAprovation from "./JoinEvent/WaitingAprovation"
import Info from "./Info/Info"

import {getStorageSession} from "../Helpers"

const ApplicationViews = (props) => {
    const hasUser = props.hasUser;
    const setUser = props.setUser;
    const setEventId = props.setEventId;
    const session = props.session;
    const setSession = props.setSession
    const changeParticipationStatus = props.changeParticipationStatus
    

    return (
        <>

        {/* Not Loged in part */}
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
                        return <Login setUser={setUser} {...props} />;
                    }
                }}
            />
            {/* Not Loged in part */}

            {/* Loged in part */}
            <Route
                exact
                path="/home"
                render={props => {

                    // no user
                    if (!hasUser) {
                        return <Redirect to="/welcome" />;
                    }
                    // No event
                    else if (session.participationStatus === 0) {
                        return <HomeClean {...props} />
                    }

                    // Event owner
                    else if (session.participationStatus === 1) {
                        return <Info {...props} />
                    }
                    
                    // 
                    else if (session.participationStatus === 2) {
                        return <Info {...props} />
                    }

                    // Waiting Approvation
                    else if (session.participationStatus === 3) {
                        return <WaitingAprovation {...props} />
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
                    return <RegisterEvent changeParticipationStatus={changeParticipationStatus} setUser={setUser} {...props} />;
                }}
            />

            {/* TESTE PAGE */}
            <Route
                exact
                path="/tests"
                render={props => {
                    return <WaitingAprovation {...props} />;
                }}
            />
        </>
    );
};

export default ApplicationViews;