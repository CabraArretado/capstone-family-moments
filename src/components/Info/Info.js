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

const Info = () => {

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
        <Jumbotron className="container mt-5">
            <h2>Welcome back!</h2> 
            <p>Your family gathering is here!</p>
                <div>
                    <h4>{event.name}</h4>
                    <h6>by: You!</h6>
                    <h5>{event.date} at {event.time}</h5>
                    <h5>Address: <span>{event.address}</span> </h5>
                    <h5> {event.description} </h5>
                </div>
            </Jumbotron>
    </>
}

export default Info