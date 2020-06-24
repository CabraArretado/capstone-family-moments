  
import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";

// Moods
import ApplicationViews from './components/ApplicationViews';
import API from './module/dataManager'
import {
  setStorageSession,
  setStorageEventId,
  getStorageSession,
  getSessionUserId
} from './Helpers'
import "./App.css"

function FamilyMoments(props) {

  /*                start LOGIN FEATURES                           */

  const isAuthenticated = () => sessionStorage.getItem("userId") !== null;

  const [hasUser, setHasUser] = useState(isAuthenticated())
  const [session, setSession] = useState(getStorageSession())


  // Set the user ID in the register
  const setUser = (user) => {
    setSession(user)
    setStorageSession(user)
    setHasUser(isAuthenticated());
  }

  const changeParticipationStatus = async (eventId, status) => {
    let requester = await API.get("users", getSessionUserId());
    requester.eventId = eventId;
    requester.participationStatus = status;
    requester = await API.put("users", requester.id, requester);
    setUser(requester)
    }



  /*                end LOGIN FEATURES                           */

return  <>
  <Link to="/tests"><button>TESTS</button></Link> {/* TEST BUTTON USED TO DEVELOPMENT*/}
  <ApplicationViews setUser={setUser} hasUser={hasUser} session={session} setSession={setSession} changeParticipationStatus={changeParticipationStatus} /> 
  </>
}
export default FamilyMoments;