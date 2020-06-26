import React, { useState, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import {
    Jumbotron,
    Button,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';

// moods
import API from "../../module/dataManager.js";
import {
    Comeback,
    getSessionUserId,
    getSessionEventId,
    generalHandleChanges
} from "../../Helpers";

const Info = () => {

    const [event, setEvent] = useState({
        name: "",
        user: { firstname: "", lastname: "" },
        date: "",
        time: "",
        address: "",
        description: "",
        eventcode: ""
    })
    const [editing, setEditing] = useState(false)
    // const [editing, setEditing] = useState(false)

    const toggleEdditing = () => {
        setEditing(!editing)
    }
    // hey

    let callBacks = async () => {
        let i = await API.getWhereExpand("events", "id", getSessionEventId(), "user")
        setEvent(i[0])
    }

    const handleEdit = (e) => {
        e.preventDefault();
        toggleEdditing();
    }

    const handleChange = (e) => {
        e.preventDefault();
        generalHandleChanges(e, event, setEvent)
        toggleEdditing()
    }

    useEffect(() => { callBacks() }, [])

    return <>
        <Jumbotron className="container mt-5">
            <h2>Welcome!</h2> 
            <p>You are the administrator of {event.name}</p>
                {
                    !editing && <div>
                    <h4>{event.name}</h4>
                    <h5>{event.date} at {event.time}</h5>
                    <h5>Address: <span>{event.address}</span> </h5>
                    <h5> {event.description} </h5>
                    <h4>EVENT CODE: {event.eventcode}</h4>
                <div>
                    <Button onClick={handleEdit}>Edit Info</Button>
                </div>
                </div>
                }
                {
                    editing && <div>
                    <Form>
                <FormGroup>
                    <Label for="name">Gathering's Title</Label>
                    <Input required onChange={handleChange} type="text" name="name" id="name" placeholder="Gathering's Title" />
                </FormGroup>
                <FormGroup>
                    <Label for="address">Address</Label>
                    <Input required onChange={handleChange} type="text" name="address" id="address" placeholder="Address" />
                </FormGroup>
                <FormGroup>
                    <Label for="datatime">When</Label>
                    <Input required onChange={handleChange} type="date" name="date" id="date"/>
                    <Input required onChange={handleChange} type="time" name="time" id="time"/>
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <textarea required onChange={handleChange} className="form-control" id="description" name="description" rows="3" placeholder="What's we are celebrating?"></textarea>
                </FormGroup>
                <FormGroup>
                    <Label for="eventcode">EVENT CODE</Label>
                    <Input className="__eventcode__RegisterEvent" required onChange={handleChange} type="text" name="eventcode" id="eventcode" placeholder="Ex. SMITH2" />
                    <small id="codeHelper" className="text-muted">
                        Must be 6 characters. The code must be unique.
                    </small>
                </FormGroup>
                <Button type="submit" className="">Register</Button>
            </Form>
                </div>
                }
            </Jumbotron>
    </>
}

export default Info