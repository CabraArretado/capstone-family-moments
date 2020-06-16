  
import React, {useState} from 'react';
import { Link } from "react-router-dom";

// Moods
import ApplicationViews from './components/ApplicationViews';
import API from './module/dataManager'
import { setStorageSession } from './Helpers'

function FamilyMoments(props) {

  /*                start LOGIN FEATURES                           */

  const isAuthenticated = () => sessionStorage.getItem("userId") !== null;
  const [hasUser, setHasUser] = useState(isAuthenticated())

  // Get the user ID by the email and set credentials including user ID
  const setUserLogin = (user) => {
    setStorageSession(user)
    setHasUser(isAuthenticated());
  };

  // Set the user ID in the register
  const setUser = (user) => {
    setStorageSession(user)
    setHasUser(isAuthenticated());
  }

  /*                end LOGIN FEATURES                           */

return  <>
  <Link to="/tests"><button>TESTS</button></Link> {/* TEST BUTTON USED TO DEVELOPMENT*/}
  <ApplicationViews setUserLogin={setUserLogin} setUser={setUser} hasUser={hasUser} /> 
  </>
}
export default FamilyMoments;