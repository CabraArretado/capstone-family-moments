import React, { useState, useReducer, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import {
    Jumbotron,
    Button
} from 'reactstrap';

// moods
import RequestBox from "./RequestBox"

import API from "../../module/dataManager.js"
import {
    getStorageSession
} from "../../Helpers"

const RequestList = (props) => {
    let changeParticipationStatus2 = props.changeParticipationStatus2

    const [requests, setRequests] = useState([])
    const [trigger, setTrigger] = useState(true)
    const triggered = () => setTrigger(!trigger)
    const session = getStorageSession()

    const getAllRequests = async () => {
        let requestList = await API.getWhereAndExpand("participations", "eventId", session.eventId, "participationStatus", 3, "user")
        console.log(requestList)
        setRequests(requestList)
    }

    const updateRequests = () => {
        getAllRequests()
    }

    useEffect(() => {
        getAllRequests()
    }, [trigger])

    return <>
        <div className="container --yellow-bg">
            <h3 className="--page-title">Requests</h3>
            <button className="--button" onClick={updateRequests}>Refresh Requests</button>
            <hr className="p-1" />
        {
            (requests.length > 0) &&  requests.map(e =>
                    <RequestBox key={e.id} user={e} changeParticipationStatus2={changeParticipationStatus2} triggered={triggered} />
                )
        }
        {
            (requests.length === 0) && <p>No request found.</p>
        }
    </div>
    </>
}

export default RequestList