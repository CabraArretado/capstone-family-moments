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