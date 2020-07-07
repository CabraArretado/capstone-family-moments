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

const InfoParticipant = () => {

    const [event, setEvent] = useState({
        name: "",
        user: { firstname: "", lastname: "" },
        date: "",
        time: "",
        address: "",
        description: ""
    })
    // hey

    let callBacks = async () => {
        let i = await API.getWhereExpand("events", "id", getSessionEventId(), "user")
        setEvent(i[0])
    }

    useEffect(() => { callBacks() }, [])

    return <>
        <div className="container --yellow-bg">
            <h2 className="--page-title">Welcome!</h2> 
            <p className="superbold">You are curently enrolled on {event.name}!</p>
                <div className="--letter">
                    <p> The gathering information </p>
                    <h4>{event.name}</h4>
                    <h6>by: {event.user.firstname + " " + event.user.lastname}</h6>
                    <h5>{event.date} at {event.time}</h5>
                    <h5>Address: <span>{event.address}</span> </h5>
                    <h5> {event.description} </h5>
                </div>
            </div>
    </>
}

export default InfoParticipant