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
    setStorageEventId,
    getSessionEventId
} from "../../Helpers"

const InfoToEdit = (props) => {

    // let getInformacao = async () => {
    //     let i = await API.get("events", getSessionEventId())
    //     return i
    // }

    const [isLoading, setIsLoading] = useState(false)
    const [informacao, setInformacao] = useState({});
    // name: "" ,
    // id: null, 
    // userId: null, 
    // address: "", 
    // date: "", 
    // time: "", 
    // description: "", 
    // eventcode: "" ,

    // Handle changes
    const handleChange = (e) => {
        generalHandleChanges(e, informacao, setInformacao)
        console.log(informacao)
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log(informacao)
        setIsLoading(true)
        if (!informacao.id || !informacao.name || !informacao.address || !informacao.date || !informacao.time || !informacao.description) {
            alert("Please, provide all the information in order to edit a gathering!")
            setIsLoading(false)
        } else {
            await API.put("events", informacao.id)
            setIsLoading(false)
            props.history.push("/home")
        }
    }

    let callBacks = async () => {
        let i = await API.get("events", getSessionEventId())
        setInformacao(i)
        console.log(informacao)
    }

    useState(() => {
        callBacks()
    }, [])

    return <>
        <Comeback />
        <Jumbotron onSubmit={handleRegister} className="container mt-5">
            <h1 className="display-3">Editing Gathering</h1>
            <p>Let's do it!</p>
            <hr />
            <Form>
                <FormGroup>
                    <Label for="name">Gathering's Title</Label>
                    <Input required onChange={handleChange} value={informacao.name} type="text" name="name" id="name" placeholder="Gathering's Title" />
                </FormGroup>
                <FormGroup>
                    <Label for="address">Address</Label>
                    <Input required onChange={handleChange} value={informacao.address} type="text" name="address" id="address" placeholder="Address" />
                </FormGroup>
                <FormGroup>
                    <Label for="datatime">When</Label>
                    <Input required onChange={handleChange}  value={informacao.date} type="date" name="date" id="date"/>
                    <Input required onChange={handleChange}  value={informacao.time} type="time" name="time" id="time"/>
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <textarea required value={informacao.description} onChange={handleChange} className="form-control" id="description" name="description" rows="3" placeholder="What's we are celebrating?"></textarea>
                </FormGroup>
                <Button disabled={isLoading} type="submit" className="">Register</Button>
            </Form>
        </Jumbotron>
    </>
};

export default InfoToEdit;