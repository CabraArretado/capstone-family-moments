  
import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";

// Moods
import ApplicationViews from './components/ApplicationViews';
import NavBar from "./components/NavBar"
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

  const changeParticipationStatus2 = async (status, userId) => {
      let requester = await API.get("users", userId);
      requester.participationStatus = status;
      requester = await API.put("users", requester.id, requester);
      }



  /*                end LOGIN FEATURES                           */

return  <>
  <NavBar />
  <ApplicationViews setUser={setUser} hasUser={hasUser} session={session} setSession={setSession} changeParticipationStatus2={changeParticipationStatus2} changeParticipationStatus={changeParticipationStatus} /> 
  </>
}
export default FamilyMoments;