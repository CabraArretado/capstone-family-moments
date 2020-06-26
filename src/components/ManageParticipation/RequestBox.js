import React from "react"
import {
    Jumbotron,
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';


//moods

const RequestBox = (props) => {
    let user = props.user
    let id = props.user.id
    console.log(id)

    const handleAccept = () => {
        props.changeParticipationStatus2(2, id)
        props.triggered()
        alert("Accepted")
    }
    const handleDecline = () => {
        props.changeParticipationStatus2(4, id)
        props.triggered()
        alert("Declined")
    }
    return <div>
            <h4>Name: {user.firstname + " "+ user.lastname}</h4>
            <Button onClick={handleAccept}>Accept</Button> <Button onClick={handleDecline}>Decline</Button> 
        </div>
}

export default RequestBox