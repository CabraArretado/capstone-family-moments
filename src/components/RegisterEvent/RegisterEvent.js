import React, {useState}from 'react';
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
import API from "../../module/dataManager.js"
import { 
    Comeback, 
    inUse, 
    generalHandleChanges,
    getSessionUserId,
    setStorageEventId,
    changeParticipationStatus
} from "../../Helpers"

const RegisterEvent = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [informacao, setInformacao] = useState({
        name: "" , 
        userId: getSessionUserId(), 
        address: "", 
        date: "", 
        time: "", 
        description: "", 
        eventcode: "" ,
    });

    // Handle changes
    const handleChange = (e) => {
        generalHandleChanges(e, informacao, setInformacao)
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        if (!informacao.name || !informacao.address || !informacao.date || !informacao.time || !informacao.description || !informacao.eventcode) {
            alert("Please, provide all the information in order to create a gathering!")
            setIsLoading(false)
        } else if ( await inUse("events", informacao, "eventcode")){
            alert("EVENT CODE already in use. Please choose other!")
            setIsLoading(false)
        } else {
            let data = await API.post("events", informacao)
            setStorageEventId(data)
            props.changeParticipationStatus(data.id, 1)
            setIsLoading(false)
            props.history.push("/home")
        }
    }

    return <>
        <Comeback />
        <Jumbotron onSubmit={handleRegister} className="container mt-5">
            <h1 className="display-3">Create Gathering</h1>
            <p>Let's do it!</p>
            <hr />
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
                <Button disabled={isLoading} type="submit" className="">Register</Button>
            </Form>
        </Jumbotron>
    </>
};

export default RegisterEvent;