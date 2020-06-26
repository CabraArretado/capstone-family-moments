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
    getSessionUserId,
    getSessionEventId
} from "../../Helpers";

const HomeDeclined = (props) => {
    const [event, setEvent] = useState({
        name: "",
        user: { firstname: "", lastname: "" },
        date: "",
        time: "",
        address: "",
        description: ""
    })

    let callBacks = async () => {
        let i = await API.getWhereExpand("events", "id", getSessionEventId(), "user")
        setEvent(i[0])
    }

    const okay = () => {
        props.changeParticipationStatus(null, 0)
        props.history.push("/home")
    }

    useEffect(() => { callBacks() }, [])


    return (
        <div>
            <Jumbotron className="container mt-5">
                <h1>Unhappily you were not approved by the administrator to join in the event:</h1>
                <div>
                    <h4>{event.name}</h4>
                    <h6>by: {event.user.firstname + " " + event.user.lastname}</h6>
                    <h5>{event.date} at {event.time}</h5>
                    <h5>Address: <span>{event.address}</span> </h5>
                    <h5> {event.description} </h5>
                </div>
                <Button onClick={okay}>Okay! Return to the Welcome Page</Button>
            </Jumbotron>
        </div>
    );
};

export default HomeDeclined;