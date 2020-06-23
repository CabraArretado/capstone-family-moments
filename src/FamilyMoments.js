  
import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";

// Moods
import ApplicationViews from './components/ApplicationViews';
import API from './module/dataManager'
import {
  setStorageSession,
  setStorageEventId,
  getStorageSession
} from './Helpers'
import "./App.css"

function FamilyMoments(props) {

  /*                start LOGIN FEATURES                           */

  const isAuthenticated = () => sessionStorage.getItem("userId") !== null;

  const [hasUser, setHasUser] = useState(isAuthenticated())
  const [session, setSession] = useState(getStorageSession())

  // Get the user ID by the email and set credentials including user ID
  const setEventId = (event) => {
    setStorageEventId(event)
  }

  // Set the user ID in the register
  const setUser = (user) => {
    setStorageSession(user)
    setHasUser(isAuthenticated());
  }

  // let session = getStorageSession()
  // const [participationStatus, setParticipationStatus] = useState(session.participationStatus)

  /*                end LOGIN FEATURES                           */

return  <>
  <Link to="/tests"><button>TESTS</button></Link> {/* TEST BUTTON USED TO DEVELOPMENT*/}
  <ApplicationViews setUser={setUser} hasUser={hasUser} session={session} setSession={setSession}  /> {/*setEventId={setEventId} hasEvent={hasEvent}*/}
  </>
}
export default FamilyMoments;