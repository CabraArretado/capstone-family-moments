import React, { useState, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import {
    Jumbotron,
    Button
} from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// moods
import API from "../../module/dataManager.js";
import {
    Comeback,
    getSessionUserId,
    getSessionEventId,
    generalHandleChanges,
    getStorageSession
} from "../../Helpers";

const Info = (props) => {

    const [event, setEvent] = useState({
        name: "",
        id: null,
        user: { firstname: "", lastname: "" },
        date: "",
        time: "",
        address: "",
        description: "",
        eventcode: ""
    })
    const [editing, setEditing] = useState(false)
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    let session = getStorageSession()

    let callBacks = async () => {
        let i = await API.getWhereExpand("events", "id", session.eventId, "user")
        setEvent(i[0])
    }

    const handleEdit = async (e) => {
        props.history.push("/editevent")
    }


    const handleDelete = async () => {
        let i = await API.delete("events", session.eventId)
    }



    useEffect(() => { callBacks() }, [])

    return <>
        <div>
            <Modal isOpen={modal} toggle={toggle} backdrop="static">
                <ModalHeader toggle={toggle}>DELETE GATHERING</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete your gathering?
        </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={ () => {
                    toggle()
                    handleDelete()
                    }}>Do Something</Button>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
        <Jumbotron className="container mt-5">
            <div>
                <div>
                    <h2>Welcome!</h2>
                    <p>You are the administrator of {event.name}</p>
                    <h4>{event.name}</h4>
                    <h5>{event.date} at {event.time}</h5>
                    <h5>Address: <span>{event.address}</span> </h5>
                    <h5> {event.description} </h5>
                    <h4>EVENT CODE: {event.eventcode}</h4>
                    <div>
                        <Button onClick={handleEdit}>Edit Info</Button><Button onClick={toggle}>Delete</Button>
                    </div>
                </div>
            </div>
        </Jumbotron>
    </>
}

export default Info