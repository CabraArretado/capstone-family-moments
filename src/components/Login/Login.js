import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {
    Jumbotron,
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

//TODO

const Login = (props) => {

    const [credentials, setCredentials] = useState({ username: "", email: "", password: "", id: "" });

    const handleChange = (e) => {
        let stateToChange = { ...credentials };
        stateToChange[e.target.id] = e.target.value;
        setCredentials(stateToChange)
    }

    const handleLogin = (e) => {
        e.preventDefault();
        props.setUser(credentials)
        console.log(credentials)
        props.history.push("/");
    }

    return <>
        <div className="container d-flex justify-content-center">
            <Jumbotron className="superbox mt-5">
                <h1 className="display-3">Log In</h1>
                <Form onSubmit={handleLogin}>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input onChange={handleChange} type="email" name="email" id="email" placeholder="Email" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input className="" type="password" name="password" id="password" placeholder="Password" />
                    </FormGroup>
                    <Button type="submit" className="">Login</Button>
                </Form>
            </Jumbotron>
        </div>
    </>
}

export default Login