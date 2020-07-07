import React, { useState, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import {
    Form,
    FormGroup,
    Input
} from 'reactstrap';

// moods
import API from "../../module/dataManager.js";
import {
    Comeback,
    getParticipationStorageSession,
    getStorageUserSession
} from "../../Helpers";

const JoinEvent = (props) => {
    // Variables
    const [isLoading, setIsLoading] = useState(false); // Button is loading
    const [nothingFound, setNothingFound] = useState(false); // trigger to the Nothing Found info

    const [isEventLoaded, setIsEventLoaded] = useState(false); // Check if the event is loaded on data
    const [eventCode, setEventCode] = useState(""); // Event code
    const [event, setEvent] = useState({}); // event itself


    let session = props.session
    let setUser = props.setUser

    // Handle changes in eventcode
    const handleChange = (e) => {
        let stateToChange = eventCode;
        stateToChange = e.target.value;
        setEventCode(stateToChange);
    }

    // Search for event code
    const checkEventCode = async () => {
        const eventQuery = await API.getWhere("events", "eventcode", eventCode);
        if (eventQuery.length === 0) {
            setIsEventLoaded(false);
            setNothingFound(true);
        }
        else if (eventQuery.length === 1) {
            setEvent(eventQuery[0]);
            setIsEventLoaded(true);
            setNothingFound(false);
        }
    }
    
    // Handle the submit of event code search
    const checkOnClick = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await checkEventCode();
        setIsLoading(false);
    }

    // Request the user data from server, add eventId and participationStatus as keys, and send back
    const handleJoin = async (e) => {
        e.preventDefault();
        let superSession = getParticipationStorageSession()
        superSession.eventId = event.id
        superSession.participationStatus = 3
        let userT = await API.get("users", session.userId)
        let partT = await API.put("participations", session.participationId, superSession)
        // No probs up to here
        setUser(userT, partT)
        props.history.push("/home")
    }

    return <>
        <div className="container --yellow-bg">
            <h5 className="--page-title">Join Gathering</h5>
            <p>Please enter the EVENT CODE provided by the gathering author</p>
            <hr />
            <Form onSubmit={checkOnClick}>
                <FormGroup className="form-row p-4">
                    <Input className="col my-2" onChange={handleChange} type="text" name="eventcode" id="eventcode" placeholder="Event Code" />
                    <button disabled={isLoading} className="col --button" type="submit">Search</button>
                </FormGroup>
            </Form>
            {
                isEventLoaded && <div>
                    <div className="--event-found">
                        <h4>{event.name}</h4>
                        <h5>{event.date} at {event.time}</h5>
                        <h5>Address: <span>{event.address}</span> </h5>
                        <h5> {event.description} </h5>
                    </div>
                    <button className="--button" onClick={handleJoin}>Request Participation!</button>
                </div>
            }

            {
                nothingFound && <div>
                    <h4 className="superbold">No event with such code on the database. Check the Event Code.</h4>
                    <p className="superbold">If the problem persist please contact the adminsitrador of the event</p>
                </div>
            }
        </div>
        <Comeback />
    </>
};

export default JoinEvent;