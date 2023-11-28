"use strict";

import { initViews } from "./view-router.js";
import { getShiftData, getSubstitutesData } from "./rest-service.js";
import { Substituterenderer } from "./substituterenderer.js";
import { ListRenderer } from "./listrenderer.js";
import { initTabs } from "./tabs.js";
import { MyShiftsRenderer } from "./shiftrenderer.js";
import { AvailableShiftsRenderer } from "./availableshiftsrenderer.js";

window.addEventListener("load", initApp);


//Definer globale variabler

let substitutes = [];
let shifts = [];

async function initApp() {
    console.log("JavaScript is live! 🎉");
    initTabs();
    initViews();
    substitutes = await getSubstitutesData();
    shifts = await getShiftData();

    console.log(substitutes);
    console.log(shifts);
    // Create an instance of Renderers
    const substituteRenderer = new Substituterenderer();
    const MyShiftsrenderer = new MyShiftsRenderer();
    const availableShiftsRenderer = new AvailableShiftsRenderer();

    const specificSubstitute = substitutes.filter((substitute) => substitute.EmployeeID === 1);
    console.log(specificSubstitute);
    const substitute = new ListRenderer(specificSubstitute, ".forside-text", substituteRenderer);
    substitute.render();

    const shiftsOfSpecificEmployee = shifts.filter((shift) =>shift.EmployeeID === 1);
    const myShifts = new ListRenderer(shiftsOfSpecificEmployee, "#myShifts", MyShiftsrenderer);
    myShifts.render();

    const displayAvailableShifts = shifts.filter((shift) => !shift.ShiftIsTaken);
    console.log(displayAvailableShifts);
    const availableShiftsSubstitutes = new ListRenderer(displayAvailableShifts, "#availableShifts", availableShiftsRenderer);
    availableShiftsSubstitutes.render();
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




