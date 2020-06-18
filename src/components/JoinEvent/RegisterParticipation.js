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
    const [informacao, setInformacao] = useState({});
    const session = getStorageSession()

    // Handle changes
    const handleChange = (e) => {
        generalHandleChanges(e, informacao, setInformacao)
    }
    

    return <>
        <Comeback />
        <Jumbotron className="container mt-5 iphone-x-size">
            <h4 className="display-3">Register Participation</h4>
            <p>Almost there! Now just provide your information and a register solicitation will be send to the gathering administrator who will be able to let you in!</p>
            <hr />
            <Form>
                <FormGroup>
                    <Label for="name">First Name:</Label>
                    <input type="text" name="name" id="name" placeholder="name" readOnly className="form-control-plaintext" value={session.firstname}/>
                </FormGroup>
                <FormGroup>
                    <Label for="name">Last Name:</Label>
                    <input type="text" name="name" id="name" placeholder="name" readOnly className="form-control-plaintext" value={session.lastname}/>
                </FormGroup>
                <FormGroup>
                    <Label for="address">Address</Label>
                    <Input required onChange={handleChange} type="text" name="address" id="address" placeholder="Address" />
                </FormGroup>

                {/* Working here */}
                <FormGroup>
                    <Label for="phone">Phone</Label>
                    <Input required onChange={handleChange} type="text" name="address" id="address" placeholder="Address" />
                </FormGroup>
                <Button disabled={isLoading} type="submit" className="">Register</Button>
            </Form>
        </Jumbotron>
    </>
};

export default RegisterParticipation;