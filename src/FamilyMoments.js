  
import React, {useState} from 'react';

// Moods
import ApplicationViews from './components/ApplicationViews';
import API from './module/dataManager'

function FamilyMoments() {

  /*                start LOGIN FEATURES                           */

  const isAuthenticated = () => sessionStorage.getItem("credentials") !== null;
  const [hasUser, setHasUser] = useState(isAuthenticated())

  // Get the user ID by the email and set credentials including user ID
  const setUserLogin = async (user) => {
    user = await API.getUserId(user.email)
    sessionStorage.setItem("credentials", JSON.stringify(user[0]));
    setHasUser(isAuthenticated());
  };

  // Set the user ID in the register
  const setUserRegister = (user) => {
    sessionStorage.setItem("credentials", JSON.stringify(user[0]));
    setHasUser(isAuthenticated());
  }

  /*                end LOGIN FEATURES                           */

return  <>
  <ApplicationViews setUserLogin={setUserLogin} setUserRegister={setUserRegister} hasUser={hasUser} /> 
  </>
}
export default FamilyMoments;