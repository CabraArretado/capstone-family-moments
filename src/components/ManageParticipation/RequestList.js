import React, {useState, useReducer}from 'react';
import { Link, Redirect } from "react-router-dom";
import {
    Jumbotron,
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

// moods
import RequestBox from "./RequestBox"

import API from "../../module/dataManager.js"
import { 
    Comeback, 
    inUse, 
    generalHandleChanges,
    getStorageSession
} from "../../Helpers"

const RequestList = (props) => {

    const [requests, setRequests] = useState([])
    const session = getStorageSession()

    const getAllRequests = async () => {
        let event = await API.getWhere("events", "userId", session.userId)
        console.log(event)
        let requestList = await API.getWhereExpanded("participations", "eventIdS")
    }


    return <>
    <h3>Requests to join on the gathering</h3>
    <hr clasName="p-1"/>
    {}
    </>
}