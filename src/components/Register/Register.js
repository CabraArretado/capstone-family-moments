import React, {useState}from 'react';
import { Link } from "react-router-dom";
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
    setStorageSession
 } from "../../Helpers"

const Register = (props) => {

    // Variables
    const [credentials, setCredentials] = useState({ firstname: "", lastname: "" , email: "", password: "", eventId: 0, participationStatus: 0 });
    const [confirmation, setConfirmation] = useState(null);

    // Handle changes in the username, email, password
    const handleChange = (e) => {
        generalHandleChanges(e, credentials, setCredentials)
    }

    // Handle password cofirmation changes
    const handleConfirmation = (e) => {
        let stateToChange = confirmation;
        stateToChange = e.target.value;
        setConfirmation(stateToChange)
    }

    // Register the use in the DB
    const createUser = (obj) => {
            return API.post("users", obj)
    }

    // Register the user and log him in
    const handleRegister = async (e) => {
        e.preventDefault();
        if (await inUse("users", credentials, "email")) {
            alert("Email already cadastred!")
        }
        else if (!credentials.firstname || !credentials.password || !credentials.email || !credentials.lastname) {
            alert("Please, provide all the information in order to create a account")
        }
        else if (credentials.password !== confirmation) {
            alert("Password and confirmation don't match")
        }
        else {
            let data = await createUser(credentials)
            props.setUser(data)
            props.history.push("/");
        }
    }


    return <>
        <Comeback />
        <Jumbotron className="container">
            <h1 className="display-3">Register Account</h1>
            <p>To have acess to the app you must create an account!</p>
            <hr />
            <Form onSubmit={handleRegister}>
                <FormGroup>
                    <Label for="firstname">First Name</Label>
                    <Input onChange={handleChange} type="text" name="firstname" id="firstname" placeholder="First Name" />
                    <Label for="lastname">Last Name</Label>
                    <Input onChange={handleChange} type="text" name="lastname" id="lastname" placeholder="lastname" />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input onChange={handleChange} type="email" name="email" id="email" placeholder="Email" />
                </FormGroup>
                <div className="form-row">
                    <FormGroup className="col-6">
                        <Label for="password">Password</Label>
                        <Input onChange={handleChange} type="password" name="password" id="password" placeholder="Password" />
                    </FormGroup>
                    <FormGroup className="col-6">
                        <Label for="confirmationInput">Confirm password</Label>
                        <Input onChange={handleConfirmation} type="password" name="confirmation" id="confirmationInput" placeholder="Confirm your password" />
                    </FormGroup>
                </div>
                <Button type="submit" className="">Register</Button>
            </Form>
        </Jumbotron>
    </>
};

export default Register;