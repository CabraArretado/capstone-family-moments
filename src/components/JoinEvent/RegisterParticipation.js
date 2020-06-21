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
import API from "../../module/dataManager.js"
import { 
    Comeback, 
    inUse, 
    generalHandleChanges,
    getStorageSession
} from "../../Helpers"


const RegisterParticipation = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    
    const session = getStorageSession()
    const tempEventId = parseInt(sessionStorage.getItem("tempEventId"))
    const [informacao, setInformacao] = useState({userId: parseInt(session.userId) ,eventId: tempEventId, address: "", phone: "", message: ""});

    // Handle changes
    const handleChange = (e) => {
        generalHandleChanges(e, informacao, setInformacao)
    }

    // Handle participation
    const handlerParticipation = (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (!informacao.address || !informacao.phone){
            alert("Please provide all required information before confirm. (Address and phone)")
        } else {
            API.post("participations", informacao)
            setIsLoading(false)
            props.history.push("/home")
        }
    }
    
    const userParticipationState = async () => {
        let user = await API.getWhere("users", informacao.userId)
        user.eventId = tempEventId
        user.participation = 
    }

    return <>
        <Comeback />
        <Jumbotron className="container mt-5 iphone-x-size">
            <h4 className="display-3">Register Participation</h4>
            <p>Almost there! Now just provide your information and a register solicitation will be send to the gathering administrator who will be able to let you in!</p>
            <hr />
            <Form onSubmit={handlerParticipation} className="container">
                <FormGroup className="form-row">
                    <Label for="name" className="col-5">First Name:</Label>
                    <input type="text" name="name" id="name" readOnly className="col form-control-plaintext" value={session.firstname}/>
                </FormGroup>
                <FormGroup className="form-row">
                    <Label className="col-5" for="name">Last Name:</Label>
                    <input type="text" name="name" id="name" readOnly className="col form-control-plaintext" value={session.lastname}/>
                </FormGroup>
                <FormGroup>
                    <Label for="address">Address</Label>
                    <Input required onChange={handleChange} className="form-control"  type="text" name="address" id="address" placeholder="Address" />
                </FormGroup>

                {/* Working here */}
                <FormGroup>
                    <Label for="phone">Phone</Label>
                    <Input required onChange={handleChange}  className="form-control" type="tel" name="phone" id="phone" placeholder="1-(555)-555-5555" />
                </FormGroup>
                <FormGroup>
                    <Label for="message">Message:</Label>
                    <textarea onChange={handleChange} className="form-control" id="message" name="message" rows="3" 
                    placeholder="Include here any aditional information you want to share with the gathering administrator"></textarea>
                </FormGroup>
                <Button disabled={isLoading} type="submit" className="">Register</Button>
            </Form>
        </Jumbotron>
    </>
};

export default RegisterParticipation;