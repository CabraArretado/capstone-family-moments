import React, {useState} from "react"
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
    const [solved, setSolved] = useState(false)

    const handleAccept = () => {
        props.changeParticipationStatus2(2, id)
        props.triggered()
        alert("Accepted")
        setSolved(true)
    }
    const handleDecline = () => {
        props.changeParticipationStatus2(4, id)
        props.triggered()
        alert("Declined")
        setSolved(true)
    }
    return <>
    { !solved && <div className="mt-5">
            <h4>Name: {user.firstname + " "+ user.lastname}</h4>
            <p>{user.email}</p>
            <Button onClick={handleAccept}>Accept</Button> <Button onClick={handleDecline}>Decline</Button> 
        </div>}
        </>
}

export default RequestBox