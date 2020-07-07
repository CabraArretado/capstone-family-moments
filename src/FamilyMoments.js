
import React, { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";

// Moods
import ApplicationViews from './components/ApplicationViews';

import SideBar from "./components/SideBar/SideBar"
import API from './module/dataManager'
import {
  setStorageSession,
  getStorageSession,
  getSessionUserId,
  getStorageUserSession
} from './Helpers'
import "./App.css"

function FamilyMoments(props) {

  /*                start LOGIN FEATURES                           */

  const isAuthenticated = () => sessionStorage.getItem("userId") !== null;

  const [hasUser, setHasUser] = useState(isAuthenticated())
  const [session, setSession] = useState(getStorageSession())
  const [trigger, setTrigger] = useState(true)


  // Set the user ID in the register
  const setUser = (user, participation) => {
    console.log("setUser: ", user, participation)
    setStorageSession({...user, participation}) // Primeiro edita o Storage
    setSession(getStorageSession()) // Depois atualiza session usando o storage
    setHasUser(isAuthenticated());
  }

  const changeParticipationStatus = async (eventId, status) => {
    let requester = await API.getWhereAnd("participations", "userId", getSessionUserId());
    requester.eventId = eventId;
    requester.participationStatus = status;
    requester = await API.put("participations", requester.id, requester);
    setUser(getStorageUserSession(), requester)
  }

  const changeParticipationStatus2 = async (status, userId) => {
    let requester = await API.get("users", userId);
    requester.participationStatus = status;
    requester = await API.put("users", requester.id, requester);
  }
  const reloadUser = async () => {
    console.log("Reloading user")
    let reloadedUser = await API.get("users", getSessionUserId());
    setStorageSession(reloadedUser)
  }

  const tools = {
    async reloadUser() {
      let reloadedUser = await API.get("users", getSessionUserId());
      setStorageSession(reloadedUser)
    },
    triggerReRender: () => {
      setTrigger(!trigger)
    }
  }


  useEffect(() => {
    return reloadUser
  }, [trigger])



  /*                end LOGIN FEATURES                           */

  return <>
    { hasUser && <SideBar hasUser={hasUser} />}
    <div className="--main">
      <div className="--top-side"></div>
      <ApplicationViews trigger={trigger} tools={tools} setUser={setUser} hasUser={hasUser} session={session} setSession={setSession} changeParticipationStatus2={changeParticipationStatus2} changeParticipationStatus={changeParticipationStatus} />
    </div>
  </>
}
export default FamilyMoments;