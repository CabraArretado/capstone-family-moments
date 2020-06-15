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