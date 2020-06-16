import React, {useState}from 'react';
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

    const [eventCode, setEventCode] = useState(null);
    const [isEventLoaded, setIsEventLoaded] = useState(true)
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
    const checkEventCode = async (code) => {
        const eventQuery = API.getWhere("events", "eventcode", code)
            if (eventQuery.length === 0){
                return false
            }
            else if (eventQuery.length === 1) {
                setEvent(eventQuery[0])
                return true
            }
    }

    return <>
        <Comeback />
        <Jumbotron className="container mt-5">
            <h5 className="display-4">Join Gathering</h5>
            <p>Please enter the EVENT CODE provided by the gathering author</p>
            <hr />
            <Form>
                <FormGroup className="form-row">
                    <Input className="col" onChange={handleChange} type="text" name="eventcode" id="eventcode" placeholder="Enter the event code" />
                    <Button  className="col" type="submit">Search</Button>
                </FormGroup>
            </Form>
            {isEventLoaded && <div>
                Hello World!
            </div>}
        </Jumbotron>
    </>
};

export default JoinEvent;