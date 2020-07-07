import React, { useState, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// moods
import API from "../../module/dataManager.js";
import {
    getSessionUserId,
    getSessionEventId,
    generalHandleChanges,
    getStorageSession,
    setStorageParticipationSession,
    getStorageUserSession,
    inUse
} from "../../Helpers";

const Info = (props) => {

    let session = props.session
    let setUser = props.setUser

    const [event, setEvent] = useState({
        name: "",
        id: "",
        // user: { firstname: "", lastname: "" },
        date: "",
        time: "",
        address: "",
        description: "",
        eventcode: ""
    })

    const [isLoading, setIsLoading] = useState(false)
    const [informacao, setInformacao] = useState({
        name: "",
        id: "",
        userId: "",
        address: "",
        date: "",
        time: "",
        description: "",
        eventcode: "",
    });


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [modal2, setModal2] = useState(false);
    const toggle2 = () => setModal2(!modal2);

    let callBacks = async () => {
        let i = await API.get("events", getSessionEventId())
        setEvent(i)
        setInformacao(i)
    }


    // const handleDelete = async () => {
    //     let eventTemp = session.eventId
    //     let userEventPart = await API.getWhere("users", "eventId", eventTemp)

    //     let i = await API.delete("events", eventTemp)
    //     props.changeParticipationStatus(0, 0)
    //     console.log(i)
    //     return i
    // }

    const together = async (e) => {
        e.preventDefault();
        toggle()
        // await handleDelete()
    }

    // EDIT ////////////////////////
    // Handle changes
    const handleChange = (e) => {
        generalHandleChanges(e, informacao, setInformacao)
        console.log(informacao)
    }

    const handleEdit = async () => {
        setIsLoading(true)
        if (!informacao.name || !informacao.address || !informacao.date || !informacao.time || !informacao.description || !informacao.eventcode) {
            alert("Please, provide all the information in order to create a gathering!")
            setIsLoading(false)
        } else if (informacao.eventcode !== event.eventcode && await inUse("events", informacao, "eventcode")){
            alert("EVENT CODE already in use. Please choose other!")
            setIsLoading(false)
        } else {
            let data = await API.put("events",event.id, informacao)
            setEvent(data)
            setIsLoading(false)
        }
    }

    const together2 = async (e) => {
        e.preventDefault();
        handleEdit();
        toggle2();
    }



    useEffect(() => { callBacks() }, [])

    return <>
        <div>
            <Modal isOpen={modal2} toggle={toggle2} backdrop="static">
                <ModalHeader toggle={toggle2}>Edit</ModalHeader>
                <ModalBody>
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
                            <Input required onChange={handleChange} value={informacao.date} type="date" name="date" id="date" />
                            <Input required onChange={handleChange} value={informacao.time} type="time" name="time" id="time" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <textarea required value={informacao.description} onChange={handleChange} className="form-control" id="description" name="description" rows="3" placeholder="What's we are celebrating?"></textarea>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" disabled={isLoading} onClick={together2}>Submit</Button>
                    <Button color="secondary" onClick={toggle2}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
        <div>
            <Modal isOpen={modal} toggle={toggle} backdrop="static">
                <ModalHeader toggle={toggle}>DELETE GATHERING</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete your gathering?
                    The data will be permanently lost.
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={together}>I am sure</Button>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
        <div className="container --yellow-bg">
            <div>
                <div>
                    <h2 className="--page-title">Welcome!</h2>
                    <p>You are the administrator of {event.name}</p>
                    <h4>{event.name}</h4>
                    <h5>{event.date} at {event.time}</h5>
                    <h5>Address: <span>{event.address}</span> </h5>
                    <h5> {event.description} </h5>
                    <h4>EVENT CODE: {event.eventcode}</h4>
                    <div>
                        <button className="--button" onClick={toggle2}>Edit</button>{' '}
                    </div>
                </div>
            </div>
        </div>
        <button onClick={toggle} className="btn btn-link">
            Delete my gathering
        </button>
    </>
}

export default Info