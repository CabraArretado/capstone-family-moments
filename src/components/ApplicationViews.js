import { Route, Redirect, Link } from "react-router-dom";
import React, { useState } from "react"

// Moods
import Welcome from "./Welcome/Welcome"
import Register from "./Register/Register"
import Login from "./Login/Login"
import HomeClean from "./HomeClean/HomeClean"
import HomeDeclined from "./HomeClean/HomeDeclined"
import RegisterEvent from "./RegisterEvent/RegisterEvent"
import JoinEvent from "./JoinEvent/JoinEvent"
import WaitingAprovation from "./JoinEvent/WaitingAprovation"
import NewsFeed from "./NewsFeed/NewsFeed"
import Info from "./Info/Info"
import InfoToEdit from "./Info/InfoToEdit"
import InfoParticipant from "./Info/InfoParticipant"
import RequestList from "./ManageParticipation/RequestList"


import { getStorageSession } from "../Helpers"

const ApplicationViews = (props) => {
    const hasUser = props.hasUser;
    const setUser = props.setUser;
    const setEventId = props.setEventId;
    const session = props.session;
    const setSession = props.setSession
    const changeParticipationStatus = props.changeParticipationStatus
    const changeParticipationStatus2 = props.changeParticipationStatus2


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
                        return <Redirect to="/" />;
                    }
                    // No event
                    else if (session.participationStatus === 0) {
                        return <HomeClean {...props} />
                    }

                    // Event owner
                    else if (session.participationStatus === 1) {
                        return <Info {...props} />
                    }

                    // Event participant
                    else if (session.participationStatus === 2) {
                        return <InfoParticipant {...props} />
                    }

                    // Waiting Approvation
                    else if (session.participationStatus === 3) {
                        return <WaitingAprovation setUser={setUser} {...props} />
                    }

                    else if (session.participationStatus === 4) {
                        return <HomeDeclined changeParticipationStatus={changeParticipationStatus} {...props} />
                    }
                }}
            />

            <Route
                exact
                path="/searchevent"
                render={props => {
                    if (!hasUser) {
                        return <Redirect to="/" />;
                    }
                    return <JoinEvent changeParticipationStatus={changeParticipationStatus} setEventId={setEventId}{...props} />;
                }}
            />

            <Route
                exact
                path="/news"
                render={props => {
                    if (!hasUser) {
                        return <Redirect to="/" />;
                    }
                    if (session.participationStatus === 2 || session.participationStatus === 1) {
                        return <NewsFeed {...props} />
                    }
                    else {
                        return <Redirect to="/home" />;
                    }
                }}
            />

            <Route
                exact
                path="/registerevent"
                render={props => {
                    if (!hasUser) {
                        return <Redirect to="/" />;
                    }
                    return <RegisterEvent changeParticipationStatus={changeParticipationStatus} setUser={setUser} {...props} />;
                }}
            />
            <Route
                exact
                path="/requestlist"
                render={props => {
                    if (!hasUser) {
                        return <Redirect to="/" />;
                    }
                    if (!session.participationStatus === 1) {
                        return <Redirect to="/home" />;
                    }
                    // Event owner
                    else if (session.participationStatus === 1) {
                        return <RequestList changeParticipationStatus2={changeParticipationStatus2} {...props} />
                    }
                }}
            />

<Route
                exact
                path="/editevent"
                render={props => {
                    if (!hasUser) {
                        return <Redirect to="/" />;
                    }
                    if (!session.participationStatus === 1) {
                        return <Redirect to="/home" />;
                    }
                    // Event owner
                    else if (session.participationStatus === 1) {
                        return <InfoToEdit changeParticipationStatus2={changeParticipationStatus2} {...props} />
                    }
                }}
            />
        </>
    );
};

export default ApplicationViews;