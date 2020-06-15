  
import React, {useState} from 'react';

// Moods
import ApplicationViews from './components/ApplicationViews';
import API from './module/dataManager'
import { setStorageSession } from './Helpers'

function FamilyMoments() {

  /*                start LOGIN FEATURES                           */

  const isAuthenticated = () => sessionStorage.getItem("userId") !== null;
  const [hasUser, setHasUser] = useState(isAuthenticated())

  // Get the user ID by the email and set credentials including user ID
  const setUserLogin = (user) => {
    setStorageSession(user)
    setHasUser(isAuthenticated());
  };

  // Set the user ID in the register
  const setUserRegister = (user) => {
    setStorageSession(user)
    setHasUser(isAuthenticated());
  }

  /*                end LOGIN FEATURES                           */

return  <>
  <ApplicationViews setUserLogin={setUserLogin} setUserRegister={setUserRegister} hasUser={hasUser} /> 
  </>
}
export default FamilyMoments;