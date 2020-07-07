import React, { useState, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";

// moods
import API from "../../module/dataManager.js";
import {
    getSessionEventId,
    getStorageSession,
    getParticipationStorageSession,
    getStorageUserSession
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
        let partUpadted = await API.get("participations", session.participationId)
        let userUpdated = await API.get("users", session.userId)
        console.log(userUpdated, partUpadted)
        props.setUser(userUpdated, partUpadted)
        props.history.push("/home")
    }



    useEffect(() => { callBacks() }, [])

    return <>
        <div className="container --yellow-bg">
            <h2 className="--superboldBIG">Your request for participation was sent!</h2> 
            <p>I will be able to access the gathering as soon as you are accepted by the administrator</p>
                <div className="--letter">
                    <h2>{event.name}</h2>
                    <h6>by: {event.user.firstname + " " + event.user.lastname}</h6>
                    <h4>{event.date} at {event.time}</h4>
                    <h4>Address: <span>{event.address}</span> </h4>
                    <h4> {event.description} </h4>
                </div>
                <button className="--button" onClick={checkUpdate}>Check Status</button>
            </div>
    </>
}

export default WaitingAprovation