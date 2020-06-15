// import React, { useState } from 'react';

// // moods
// import API from "../../module/dataManager.js"

// // General API manager, first parameter always the list name in lower case

// const loginManager = () => {
//     const isAuthenticated = () => sessionStorage.getItem("credentials") !== null;
//     const [hasUser, setHasUser] = useState(isAuthenticated())

//     // Get the user ID by the email and set credentials including user ID
//     const setUserLogin = async (user) => {
//         user = await API.getUserId(user.email)
//         sessionStorage.setItem("credentials", JSON.stringify(user[0]));
//         setHasUser(isAuthenticated());
//     };

//     // Set the user ID in the register
//     const setUserRegister = (user) => {
//         sessionStorage.setItem("credentials", JSON.stringify(user[0]));
//         setHasUser(isAuthenticated());
//     }

//     const inUse = async (user, chave) => {
//         console.log(user, chave)
//         let key = await API.getWhere("users", key, user[key])
//         if (key.length === 1) {
//             return true
//         }
//         else if (key.length === 0){
//             return false
//         }
//     }
// }