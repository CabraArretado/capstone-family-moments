import { useHistory } from "react-router-dom"
import React from 'react';


import API from './module/dataManager'

// Button Go Back <
export const Comeback = () => {
  let history = useHistory();
  return (
    <>
      <button onClick={() => history.goBack()}>Back</button>
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
  console.log("stateToChange: ", stateToChange)
  setArray(stateToChange)
}

 /* ----------------------------------------- Session storage functions */

//  SET USER
export const setStorageSession = (user) => {
  sessionStorage.setItem("userId", user.id)
  sessionStorage.setItem("firstname",user.firstname)
  sessionStorage.setItem("lastname",user.lastname)
  sessionStorage.setItem("email",user.email)
  return true
}

// SET EVENT
export const setStorageEvent = (event) => {
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
  }
}


 /* ----------------------------------------- END Session storage functions */


// Transform date in a Date obj
export const passDate = (date) => {
  date = new Date(date)
  return date
}