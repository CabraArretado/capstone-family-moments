import React, {useState} from "react"



//moods

const RequestBox = (props) => {
    let user = props.user.user
    let participationId = props.user.id
    const [solved, setSolved] = useState(false)

    const handleAccept = () => {
        props.changeParticipationStatus2(participationId, 2)
        props.triggered()
        alert("Accepted")
        setSolved(true)
    }
    const handleDecline = () => {
        props.changeParticipationStatus2(participationId, 4)
        props.triggered()
        alert("Declined")
        setSolved(true)
    }
    return <>
    { !solved && <div className="mt-5">
            <h4>Name: {user.firstname + " "+ user.lastname}</h4>
            <p>{user.email}</p>
            <button className="--button mr-1" onClick={handleAccept}>Accept</button> <button className="--button" onClick={handleDecline}>Decline</button>
            <hr className="mx-1" />
        </div>}
        </>
}

export default RequestBox