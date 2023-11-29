"use strict";

const endpoint = "http://localhost:3333";


// ===== IMPORTS ===== \\
import { loginClicked } from "./login.js";
import { initViews, logOutView } from "./view-router.js";
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
    document.querySelector("#logout-btn").classList.add("hidden");
    document.querySelector("#login-form").addEventListener("submit", loginClicked);
    document.querySelector("#logout-btn").addEventListener("click", logOutView)

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

export { endpoint, initApp };
