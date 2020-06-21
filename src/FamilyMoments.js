  
import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";

// Moods
import ApplicationViews from './components/ApplicationViews';
import API from './module/dataManager'
import {
  setStorageSession,
  setStorageEventId
} from './Helpers'
import "./App.css"

function FamilyMoments(props) {

  /*                start LOGIN FEATURES                           */

  const isAuthenticated = () => sessionStorage.getItem("userId") !== null;
  const isEventLinked = () => sessionStorage.getItem("eventId") !== null;

  const [hasUser, setHasUser] = useState(isAuthenticated())
  const [hasEvent, setHasEvent] = useState(isEventLinked())

  // Get the user ID by the email and set credentials including user ID
  const setEventId = (event) => {
    setStorageEventId(event)
    setHasEvent(isEventLinked())
  }

  // Set the user ID in the register
  const setUser = (user) => {
    setStorageSession(user)
    setHasUser(isAuthenticated());
  }

  /*                end LOGIN FEATURES                           */

return  <>
  <Link to="/tests"><button>TESTS</button></Link> {/* TEST BUTTON USED TO DEVELOPMENT*/}
  <ApplicationViews setEventId={setEventId} setUser={setUser} hasUser={hasUser} hasEvent={hasEvent} /> 
  </>
}
export default FamilyMoments;