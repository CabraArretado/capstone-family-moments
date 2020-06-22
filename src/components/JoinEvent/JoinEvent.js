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
import API from "../../module/dataManager.js"
import {
    Comeback,
    getSessionUserId
}
    from "../../Helpers"

const JoinEvent = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [nothingFound, setNothingFound] = useState(false);

    const [isEventLoaded, setIsEventLoaded] = useState(false);
    const [eventCode, setEventCode] = useState("");
    const [event, setEvent] = useState({
        // eventId: null,
        // name: "",
        // userId: null,
        // user: {},
        // address: "",
        // date: "",
        // time: "",
        // description: "",
        // eventcode: ""
    })

    // Handle changes in eventcode
    const handleChange = (e) => {
        let stateToChange = eventCode
        stateToChange = e.target.value
        setEventCode(stateToChange)
    }

    // Search for event code
    const checkEventCode = async () => {
        let eventQuery = await API.getWhereExpand("events", "eventcode", eventCode, "user")
        eventQuery = eventQuery[0]
        console.log("eventQuery: ", eventQuery)

        if (!eventQuery) {
            setIsEventLoaded(false)
            setNothingFound(true)
        }
        else{
            setEvent(eventQuery)
            setIsEventLoaded(true)
            setNothingFound(false)
            console.log("event: ", event)
        }
    }

    // Handle the submit of event code search
    const checkOnClick = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        await checkEventCode();
        setIsLoading(false)
    }

    const handleJoin = async (e) => {
        e.preventDefault();
        let requester = await API.get("users", getSessionUserId())
        console.log(requester)
        requester.eventId = event.id;
        requester.participationStatus = 3;
        await API.put("users", requester)
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
                    <Button onClick={handleJoin}>Join!</Button>
                </div>
            }

            {
                nothingFound && <div>
                    <h4>No event with such code on the database. Check the Event Code.</h4>
                    <p>If the problem persist please contact the adminsitrador of the event</p>
                </div>
            }
            {/* 
            {
            !eventCode && !isEventLoaded && <div>
                <h4>Please, provide the Event Code provided by the administrator</h4>
            </div>
            } */}
        </Jumbotron>
    </>
};

export default JoinEvent;