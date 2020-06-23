import React, { useState } from 'react';
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
import { Comeback, generalHandleChanges } from "../../Helpers"

const Login = (props) => {

    const [credentials, setCredentials] = useState({email: "", password: ""});

    const handleChange = (e) => {
        generalHandleChanges(e, credentials, setCredentials)
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        let tempo = await API.getWhere("users", "email", credentials.email)

        // Checks if e-mail exist and 
        if (tempo.length === 1 && credentials.password === tempo[0].password) {
            props.setUser(tempo[0])
            props.history.push("/home")
        } else {
            alert("Email or password wrong!")
        }
    }

    return <>
        <div className="container d-flex justify-content-center">
            <Jumbotron className="superbox mt-5">
            <Comeback />
                <h1 className="display-3">Log In</h1>
                <Form onSubmit={handleLogin}>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input onChange={handleChange} type="email" name="email" id="email" placeholder="Email" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input className="" onChange={handleChange} type="password" name="password" id="password" placeholder="Password" />
                    </FormGroup>
                    <Button type="submit" className="">Login</Button>
                </Form>
            </Jumbotron>
        </div>
    </>
}

export default Login