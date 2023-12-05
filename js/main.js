"use strict";

//Endpoint
const endpoint = "http://localhost:3333";

// ===== IMPORTS ===== \\
import { loginClicked } from "./login.js";
import { initViews, logOutView } from "./view-router.js";
import { getShiftData, getShiftInterestData, getSubstitutesData, getRequestedShifts, assignSubstitute } from "./rest-service.js";
import { Substituterenderer } from "./substituterenderer.js";
import { ListRenderer } from "./listrenderer.js";
import { initTabs } from "./tabs.js";
import { MyShiftsRenderer } from "./myshiftsrenderer.js";
import { AvailableShiftsRenderer } from "./availableshiftsrenderer.js";
// import { ShiftsAdminRenderer } from "./shiftsadminrenderer.js";
import { createNewSubstituteClicked, createNewSubstitute, closeCreateNewSubstituteDialog } from "./create-new-substitute.js";
import { AdminShiftRenderer } from "./adminshiftrenderer.js";
import { AdminViewAvaliableShiftRenderer } from "./view/admin-view-avaliable-shift-renderer.js";
import { SubstitutesForAdminRenderer } from "./substitutesforadminrenderer.js";
import * as requestedshift from "./model/requested-shift.js";
import { createNewShiftClicked, createNewShift } from "./create-new-shift.js";

window.addEventListener("load", initApp);

//Definer globale variabler
let requestedShiftsList = [];
let substitutes = [];
let shifts = [];
let employee = [];
let loggedInEmployeeID = [];
let shiftInterests = [];

async function initApp() {
    console.log("JavaScript is live! 🎉");

    //hiding logout button
    document.querySelector("#logout-btn").classList.add("hidden");

    //eventlisteners
    document.querySelector("#dialog-admin-assign-shift").addEventListener("submit", assignSubstitute);
    document.querySelector("#logout-btn").addEventListener("click", logOutView);
    document.querySelector("#denyInterest-btn").addEventListener("click", function () {
        document.querySelector("#shiftInterest-dialog").close();
    });
    document.querySelector("#reject-new-login-info").addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default form submission behavior
        document.querySelector("#editLoginInfo-dialog").close();
    });

    document.querySelector("#close-passwords-dialog").addEventListener("click", function () {
        document.querySelector("#not-matching-passwords").close();
    });
    document.querySelector("#close-shiftInterest-dialog-btn").addEventListener("click", function () {
        document.querySelector("#existing-shiftInterest-entry").close();
    });

    document.querySelector("#login-form").addEventListener("submit", async (event) => {
        event.preventDefault();
        employee = await loginClicked();
        // console.log(employee);

        // Get the EmployeeID of the logged-in user
        loggedInEmployeeID = employee.EmployeeID;
        // console.log(loggedInEmployeeID);

        if (employee.IsAdmin) {
            // console.log(`logged in as: admin`);
            await updateRequestedShiftsList();

            // Create an instance of "item"Renderers for admin
            const substituteRenderer = new Substituterenderer();
            const adminShiftRenderer = new AdminShiftRenderer();
            const adminViewAvaliableShiftRenderer = new AdminViewAvaliableShiftRenderer();
            const substitutesForAdminRenderer = new SubstitutesForAdminRenderer();

            //filtering substitutes-list for everyone but the user logged in
            const specificSubstitute = substitutes.filter((substitute) => substitute.EmployeeID === loggedInEmployeeID);
            //Making a variable/object that holds a new instance of a Listrenderer with parameters for info on the user logged in
            const substitute = new ListRenderer(specificSubstitute, "#admin-user-info", substituteRenderer);
            substitute.render();

            //New instance of Listrenderer for shifts (admin view)
            const shiftsAdminList = new ListRenderer(shifts, "#shifts-admin-tbody", adminShiftRenderer);
            shiftsAdminList.render();

            const availableShiftsListAdmin = requestedShiftsList.filter((shift) => !shift.shiftIsTaken);
            const adminAvaliableShiftList = new ListRenderer(availableShiftsListAdmin, "#availableShifts-admin-tbody", adminViewAvaliableShiftRenderer);
            adminAvaliableShiftList.render();

            const userListForAdmin = new ListRenderer(substitutes, "#substitutes-list-admin-tbody", substitutesForAdminRenderer);
            userListForAdmin.render();
        } else if (!employee.IsAdmin) {
            // console.log(`logged in as: substitute`);

            // Create an instance of Renderers
            const substituteRenderer = new Substituterenderer();
            const MyShiftsrenderer = new MyShiftsRenderer();
            const availableShiftsRenderer = new AvailableShiftsRenderer();

            // Convert shift.EmployeeID to string before comparison
            const shiftsOfLoggedInEmployee = shifts.filter((shift) => String(shift.EmployeeID) === String(loggedInEmployeeID));
            // console.log(shiftsOfLoggedInEmployee);
            const myShifts = new ListRenderer(shiftsOfLoggedInEmployee, "#myShifts", MyShiftsrenderer);
            myShifts.render();

            const specificSubstitute = substitutes.filter((substitute) => substitute.EmployeeID === loggedInEmployeeID);
            // console.log(specificSubstitute);
            const substitute = new ListRenderer(specificSubstitute, ".my-info", substituteRenderer);
            substitute.render();
            substituteRenderer.attachEventListener(substitute);

            const displayAvailableShifts = shifts.filter((shift) => !shift.ShiftIsTaken);
            // console.log(displayAvailableShifts);
            const availableShiftsSubstitutes = new ListRenderer(displayAvailableShifts, "#availableShifts", availableShiftsRenderer);
            availableShiftsSubstitutes.render();
            availableShiftsRenderer.attachEventListener();
        }
    });

    // initTabs();
    initViews();
    substitutes = await getSubstitutesData();
    shifts = await getShiftData();
    shiftInterests = await getShiftInterestData();

    // eventlisteners for create new substitute
    document.querySelector("#create-substitute-btn").addEventListener("click", createNewSubstituteClicked);
    document.querySelector("#form-create-new-substitute").addEventListener("submit", createNewSubstitute);
    document.querySelector("#form-create-new-substitute-cancel-btn").addEventListener("click", closeCreateNewSubstituteDialog);

    // eventlisteners for create new shift
    document.querySelector("#create-new-shift-btn").addEventListener("click", createNewShiftClicked);
    document.querySelector("#form-create-new-shift").addEventListener("submit", createNewShift);
}

async function updateRequestedShiftsList() {
    const data = await getRequestedShifts();
    requestedShiftsList = data.map(requestedshift.construct);
}

export { endpoint, initApp, employee, loggedInEmployeeID, shiftInterests, substitutes, requestedShiftsList, updateRequestedShiftsList };
