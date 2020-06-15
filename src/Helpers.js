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

export const setStorageSession = (user) => {
  sessionStorage.setItem("userId", user.id)
  sessionStorage.setItem("userName", user.username)
}

export const inUse = async (user, chave) => {
  console.log(user, chave, user[chave])
  let key = await API.getWhere("users", chave, user[chave])
  console.log(key.length, key.length === 0, key.length === 1)
  if (key.length === 0) {
      return false
  }
  else if (key.length === 1){
      return true
  }
}