import React, {useState, useEffect}from 'react';
import { Link } from "react-router-dom";
import {
    Jumbotron,
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

// moods
import API from "../../module/dataManager.js"
import { Comeback, inUse, generalHandleChanges } from "../../Helpers"

const JoinEvent = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isEventLoaded, setIsEventLoaded] = useState(false)
    const [eventCode, setEventCode] = useState(null);
    const [event, setEvent] = useState({
        name: "" , 
        userId: "", 
        address: "", 
        date: "", 
        time: "", 
        description: "", 
        eventcode: "" 
    })

    // Handle changes in the username, email, password
    const handleChange = (e) => {
        generalHandleChanges(e, eventCode, setEventCode)
    }

    // Search for event code
    const checkEventCode = async () => {
        const eventQuery = await API.getWhere("events", "eventcode", eventCode)
        console.log(eventQuery)
            if (eventQuery.length === 0){
                setIsEventLoaded(false)
            }
            else if (eventQuery.length === 1) {
                setEvent(eventQuery[0])
                setIsEventLoaded(true)
            }
    }

    // Handle the submit of event code search
    const checkOnClick = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        await checkEventCode();
        setIsLoading(false)
    }

    // Listener to the event moodification
    // useEffect(() => {await checkEventCode()}, [])

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
                    <span><h5>{event.data}</h5></span>
                </div>
            </div>
            }
        </Jumbotron>
    </>
};

export default JoinEvent;