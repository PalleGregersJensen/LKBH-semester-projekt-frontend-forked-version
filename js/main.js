"use strict";

import { initViews } from "./view-router.js";


window.addEventListener("load", initApp);

//Tilføjer midlertidige globale variabler
const username = 1234;
const password = 1234;

function initApp() {
    console.log("JavaScript is live! 🎉");
    initViews();
}

// function validateLogin() {
//     // Get values from the form
//     var typedUsername = document.getElementById('username').value;
//     var typedPassword = document.getElementById('password').value;

//     // Check if the typed username and password match your criteria
//     if (typedUsername === username && typedPassword === password) {
//         // Login successful
//         alert('Login successful!');
//         // Optionally, you can remove the form or redirect to another page
//         document.getElementById('login-form').remove();
//     } else {
//         // Login failed, show an error message
//         alert('Incorrect username or password. Please try again.');
//     }
// }




