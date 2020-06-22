import React, { useState, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import {
    Jumbotron,
    Button,
    Form,
    FormGroup,
    Input
} from 'reactstrap';

// moods
import API from "../../module/dataManager.js";
import {
    Comeback,
    getSessionUserId
} from "../../Helpers";

const JoinEvent = (props) => {
    // Variables
    const [isLoading, setIsLoading] = useState(false); // Button is loading
    const [nothingFound, setNothingFound] = useState(false); // trigger to the Nothing Found info

    const [isEventLoaded, setIsEventLoaded] = useState(false); // Check if the event is loaded on data
    const [eventCode, setEventCode] = useState(""); // Event code
    const [event, setEvent] = useState({}); // event itself

    // Handle changes in eventcode
    const handleChange = (e) => {
        let stateToChange = eventCode;
        stateToChange = e.target.value;
        setEventCode(stateToChange);
    }

    // Search for event code
    const checkEventCode = async () => {
        const eventQuery = await API.getWhereExpand("events", "eventcode", eventCode, "user");
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

        let requester = await API.get("users", getSessionUserId());

        
        requester.eventId = event.id;
        requester.participationStatus = 3;

        await API.put("users", requester.id, requester);
    }




    return <>
        <Comeback />
        <Jumbotron className="container mt-5">
            <h5 className="display-4">Join Gathering</h5>
            <p>Please enter the EVENT CODE provided by the gathering author</p>
            <hr />
            <Form onSubmit={checkOnClick}>
                <FormGroup className="form-row">
                    <Input className="col" onChange={handleChange} type="text" name="eventcode" id="eventcode" placeholder="Enter the event code" />
                    <Button disabled={isLoading} className="col" type="submit">Search</Button>
                </FormGroup>
            </Form>
            {
                isEventLoaded && <div>
                    <div>
                        <h4>{event.name}</h4>
                        <h6>by: {event.user.username}</h6>
                        <h5>{event.date} at {event.time}</h5>
                        <h5>Address: <span>{event.address}</span> </h5>
                        <h5> {event.description} </h5>
                    </div>
                    <Button onClick={handleJoin}>Request Participation!</Button>
                </div>
            }

            {
                nothingFound && <div>
                    <h4>No event with such code on the database. Check the Event Code.</h4>
                    <p>If the problem persist please contact the adminsitrador of the event</p>
                </div>
            }
        </Jumbotron>
    </>
};

export default JoinEvent;