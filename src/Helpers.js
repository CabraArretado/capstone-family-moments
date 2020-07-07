import { useHistory } from "react-router-dom"
import React from 'react';


import API from './module/dataManager'

// Button Go Back <
export const Comeback = () => {
  let history = useHistory();
  return (
    <>
      <button className="--button --return" onClick={() => history.goBack()}>⇦</button>
    </>
  );
};

// Check if determitate obj propiety is in use in the database (used email, eventcode)
export const inUse = async (list, obj, chave) => {
  console.log(obj, chave, obj[chave])
  let key = await API.getWhere(list, chave, obj[chave])
  console.log(key.length, key.length === 0, key.length === 1)
  if (key.length === 0) {
    return false
  }
  else if (key.length === 1){
    return true
  }
}

// Handle any form change
export const generalHandleChanges = (event, array, setArray) => {
  let stateToChange = {...array};
  stateToChange[event.target.id] = event.target.value
  setArray(stateToChange)
}

 /* Session storage functions */

//  SET USER
export const setStorageSession = (user) => {
  sessionStorage.setItem("userId", user.id)
  sessionStorage.setItem("firstname",user.firstname)
  sessionStorage.setItem("lastname",user.lastname)
  sessionStorage.setItem("email",user.email)
  sessionStorage.setItem("participationId",user.participation.id)
  sessionStorage.setItem("eventId",user.participation.eventId)
  sessionStorage.setItem("participationStatus",user.participation.participationStatus)
}

export const setStorageUserSession = (user) => {
  sessionStorage.setItem("userId", user.id)
  sessionStorage.setItem("firstname",user.firstname)
  sessionStorage.setItem("lastname",user.lastname)
  sessionStorage.setItem("email",user.email)
}

export const setStorageParticipationSession = (participation) => {
  sessionStorage.setItem("participationId", participation.id)
  sessionStorage.setItem("eventId",participation.eventId)
  sessionStorage.setItem("participationStatus",participation.participationStatus)
}

// SET EVENT ID
export const setStorageEventId = (event) => {
  sessionStorage.setItem("eventId", event.id)
}

// GET USER ID
export const getSessionUserId = () => {
  return parseInt(sessionStorage.getItem("userId"))
}

// GET EVENT ID
export const getSessionEventId = () => {
  return parseInt(sessionStorage.getItem("eventId"))
}

export const getStorageSession  = () => {
  return {
    userId: parseInt(sessionStorage.getItem("userId")),
    firstname: sessionStorage.getItem("firstname"),
    lastname: sessionStorage.getItem("lastname"),
    email: sessionStorage.getItem("email"),
    eventId: parseInt(sessionStorage.getItem("eventId")),
    participationId: parseInt(sessionStorage.getItem("participationId")),
    participationStatus: parseInt(sessionStorage.getItem("participationStatus"))
  }
}

export const getParticipationStorageSession  = () => {
  return {
    userId: parseInt(sessionStorage.getItem("userId")),
    eventId: parseInt(sessionStorage.getItem("eventId")),
    participationId: parseInt(sessionStorage.getItem("articipationId")),
    participationStatus: parseInt(sessionStorage.getItem("participationStatus"))
  }
}


export const getStorageUserSession  = () => {
  return {
    userId: parseInt(sessionStorage.getItem("userId")),
    firstname: sessionStorage.getItem("firstname"),
    lastname: sessionStorage.getItem("lastname"),
    email: sessionStorage.getItem("email"),
  }
}

 /* ----------------------------------------- */

export const isLogged = () => {
  
}

 /* ----------------------------------------- */