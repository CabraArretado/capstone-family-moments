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
    getSessionEventId,
    getStorageSession
} from "../../Helpers";

const WaitingAprovation = (props) => {
    let session = getStorageSession()
    const [user, setUser] = useState(session)

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

    let checkUpdate = async () => {
        let userUpadted = await API.get("users", session.userId)
        props.setUser(userUpadted)
        props.history.push("/home")
    }



    useEffect(() => { callBacks() }, [])

    return <>
        <Jumbotron className="container mt-5">
            <h2>Your request for participation was sent!</h2> 
            <p>I will be able to access the gathering as soon as you are accepted by the administrator</p>
                <div>
                    <h4>{event.name}</h4>
                    <h6>by: {event.user.firstname + " " + event.user.lastname}</h6>
                    <h5>{event.date} at {event.time}</h5>
                    <h5>Address: <span>{event.address}</span> </h5>
                    <h5> {event.description} </h5>
                </div>
                <Button onClick={checkUpdate}>Check Status</Button>
            </Jumbotron>
    </>
}

export default WaitingAprovation