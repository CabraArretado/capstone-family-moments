import React, {useState, useReducer, useEffect}from 'react';
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
        let requestList = await API.getWhereAnd("users", "eventId", session.eventId, "participationStatus", 3)
        setRequests(requestList)
    }

    const updateRequests = () => {
        getAllRequests()
    }

    useEffect(()=> {
        getAllRequests()
    }, [trigger])

    return <>
    <Jumbotron>
    <h3>Requests to join on the gathering</h3>
    <Button onClick={updateRequests}>Refresh Requests</Button>
    <hr className="p-1"/>
    {
        requests.map(e =>
                    <RequestBox key={e.id} user={e} changeParticipationStatus2={changeParticipationStatus2} triggered={triggered}/>
                )
    }
    </Jumbotron>
    </>
}

export default RequestList