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
// import Welcome from "./Welcome/Welcome"

import {getStorageSession} from "../Helpers"

const ApplicationViews = (props) => {
    const hasUser = props.hasUser;
    const setUser = props.setUser;
    const setEventId = props.setEventId;
    const session = props.session;
    const setSession = props.setSession
    
// const [participationStatus, setParticipationStatus] = useState(session.participationStatus)

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
                    console.log("1 - ", !hasUser)
                    console.log("2 - ", parseInt(session.participationStatus))
                    console.log("3 - ", session.participationStatus === 3)
                    console.log(session)
                    // no user
                    if (!hasUser) {
                        return <Redirect to="/welcome" />;
                    }
                    // No event
                    else if (session.participationStatus === 0) {
                        return <HomeClean {...props} />
                    }
                    // user and event
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
                    return <RegisterEvent setEventId={setEventId}{...props} />;
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