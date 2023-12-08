"use strict";

//Endpoint
const endpoint = "http://localhost:3333";

// ===== IMPORTS ===== \\
import { login } from "./login.js";
import { initViews, logOutView, viewChange } from "./view-router.js";
import { getShiftData, getShiftInterestData, getSubstitutesData, getRequestedShifts, assignSubstitute, updateSubstitute, deleteSubstitute } from "./rest-service.js";
import { Substituterenderer } from "./substituterenderer.js";
import { ListRenderer } from "./listrenderer.js";
import { initTabs } from "./tabs.js";
import { MyShiftsRenderer } from "./myshiftsrenderer.js";
import { AvailableShiftsRenderer } from "./availableshiftsrenderer.js";
// import { ShiftsAdminRenderer } from "./shiftsadminrenderer.js";
import { createNewSubstituteClicked, createNewSubstitute, closeCreateNewSubstituteDialog } from "./create-new-substitute.js";
import { AdminShiftRenderer } from "./adminshiftrenderer.js";
import { AdminViewAvaliableShiftRenderer } from "./view/admin-view-avaliable-shift-renderer.js";
import { AdminViewSubstitutesRenderer } from "./view/admin-view-substitutes-renderer.js .js";
import * as requestedshift from "./model/requested-shift.js";
import * as shift from "./model/myshifts.js";
import * as substitute from "./model/substitute.js";
import { createNewShiftClicked, createNewShift, closeCreateNewShiftDialog } from "./create-new-shift.js";

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
    // document.querySelector("#logout-btn").classList.add("hide");
    // const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // if (currentUser) {
    //     console.log("viewChange called with with currentUser");
    //     viewChange();
    // } else {
    //     console.log("viewChange called with no user");
    //     viewChange();
    // }

    applyEventListeners();

    initViews();
    // initTabs();
    // await buildShiftsList();
    // await buildSubstitutesList();

    shiftInterests = await getShiftInterestData();
    // console.log(shiftInterests);
}

async function buildRequestedShiftsList() {
    const data = await getRequestedShifts();
    requestedShiftsList = data.map(requestedshift.construct);
}

async function buildShiftsList() {
    const originalData = await getShiftData();
    shifts = originalData.map(shift.construct);
}

async function buildSubstitutesList() {
    const originalData = await getSubstitutesData();
    substitutes = originalData.map(substitute.construct);
}

function cancelDeleteSubstitute() {
    document.querySelector("#dialog-delete-substitute").close();
}

function cancelUpdateSubstitute() {
    document.querySelector("#dialog-admin-update-substitute").close();
}

function applyEventListeners() {
    //
    document.querySelector("#login-form").addEventListener("submit", login);

    // eventlisteners for create new substitute
    document.querySelector("#create-substitute-btn").addEventListener("click", createNewSubstituteClicked);
    document.querySelector("#form-create-new-substitute").addEventListener("submit", createNewSubstitute);
    document.querySelector("#form-create-new-substitute-cancel-btn").addEventListener("click", closeCreateNewSubstituteDialog);

    // eventlisteners for create new shift
    document.querySelector("#create-new-shift-btn").addEventListener("click", createNewShiftClicked);
    document.querySelector("#form-create-new-shift").addEventListener("submit", createNewShift);
    document.querySelector("#form-create-new-shift-cancel-btn").addEventListener("click", closeCreateNewShiftDialog);

    // eventlisteners for assign substitute
    document.querySelector("#dialog-admin-assign-shift").addEventListener("submit", assignSubstitute);

    // eventlisteners for update substitute
    document.querySelector("#form-admin-update-substitute").addEventListener("submit", updateSubstitute);
    document.querySelector("#form-admin-update-substitute-cancel-btn").addEventListener("click", cancelUpdateSubstitute);

    // eventlisteners for delete substitute
    document.querySelector("#form-delete-substitute").addEventListener("submit", deleteSubstitute);
    document.querySelector("#form-cancel-delete-substitute").addEventListener("click", cancelDeleteSubstitute);

    // eventlistener for logout
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
}

function loginAsAdmin() {
    // console.log(`logged in as: admin`);
    buildRequestedShiftsList();

    // Create an instance of "item"Renderers for admin
    const substituteRenderer = new Substituterenderer();
    const adminShiftRenderer = new AdminShiftRenderer();
    const adminViewAvaliableShiftRenderer = new AdminViewAvaliableShiftRenderer();
    const adminViewSubstitutesRenderer = new AdminViewSubstitutesRenderer();

    //filtering substitutes-list for everyone but the user logged in
    const specificSubstitute = substitutes.filter((substitute) => substitute.id === loggedInEmployeeID);
    //Making a variable/object that holds a new instance of a Listrenderer with parameters for info on the user logged in
    const substitute = new ListRenderer(specificSubstitute, "#admin-user-info", substituteRenderer);
    substitute.render();

    //New instance of Listrenderer for shifts (admin view)
    const shiftsAdminList = new ListRenderer(shifts, "#shifts-admin-tbody", adminShiftRenderer);
    shiftsAdminList.render();

    const availableShiftsListAdmin = requestedShiftsList.filter((shift) => !shift.shiftIsTaken);
    const adminAvaliableShiftList = new ListRenderer(availableShiftsListAdmin, "#availableShifts-admin-tbody", adminViewAvaliableShiftRenderer, "#assign-btn");
    adminAvaliableShiftList.render();

    const userListForAdmin = new ListRenderer(substitutes, "#substitutes-list-admin-tbody", adminViewSubstitutesRenderer, "#update-substitute-btn", "#delete-substitute-btn");
    userListForAdmin.render();
}

function loginAsSubstitute() {
    // Create an instance of Renderers
    const substituteRenderer = new Substituterenderer();
    const MyShiftsrenderer = new MyShiftsRenderer();
    const availableShiftsRenderer = new AvailableShiftsRenderer();

    // Convert shift.id to string before comparison
    const shiftsOfLoggedInEmployee = shifts.filter((shift) => String(shift.employeeID) === String(loggedInEmployeeID));
    const myShifts = new ListRenderer(shiftsOfLoggedInEmployee, "#myShifts", MyShiftsrenderer);
    myShifts.render();

    const specificSubstitute = substitutes.filter((substitute) => substitute.id === loggedInEmployeeID);
    const substitute = new ListRenderer(specificSubstitute, ".my-info", substituteRenderer);
    substitute.render();
    substituteRenderer.attachEventListener(substitute);

    const displayAvailableShifts = shifts.filter((shift) => !shift.shiftIsTaken);
    const availableShiftsSubstitutes = new ListRenderer(displayAvailableShifts, "#availableShifts", availableShiftsRenderer);
    availableShiftsSubstitutes.render();
    availableShiftsRenderer.attachEventListener();

    // add sort eventlisteners mine vagter
    document.querySelector("#shifts-table-headers").addEventListener("click", (event) => {
        const targetId = event.target.id;
        if (targetId === "shift-date") {
            myShifts.sort("date");
        } else if (targetId === "shifts-shift-time") {
            myShifts.sort("shiftStart");
        } else if (targetId === "shift-hours") {
            myShifts.sort("shiftLength");
        }
    });

    // add sort eventlisteners ledige vagter
    document.querySelector("#available-shifts-table-headers").addEventListener("click", (event) => {
        const targetId = event.target.id;
        if (targetId === "shift-date") {
            availableShiftsSubstitutes.sort("date");
        } else if (targetId === "available-shift-time") {
            availableShiftsSubstitutes.sort("shiftStart");
        }
    });
}

// function testSomething() {
//     if (employee.IsAdmin) {
//             // // console.log(`logged in as: admin`);
//             // buildRequestedShiftsList();

//             // // Create an instance of "item"Renderers for admin
//             // const substituteRenderer = new Substituterenderer();
//             // const adminShiftRenderer = new AdminShiftRenderer();
//             // const adminViewAvaliableShiftRenderer = new AdminViewAvaliableShiftRenderer();
//             // const adminViewSubstitutesRenderer = new AdminViewSubstitutesRenderer();

//             // //filtering substitutes-list for everyone but the user logged in
//             // const specificSubstitute = substitutes.filter((substitute) => substitute.id === loggedInEmployeeID);
//             // //Making a variable/object that holds a new instance of a Listrenderer with parameters for info on the user logged in
//             // const substitute = new ListRenderer(specificSubstitute, "#admin-user-info", substituteRenderer);
//             // substitute.render();

//             // //New instance of Listrenderer for shifts (admin view)
//             // const shiftsAdminList = new ListRenderer(shifts, "#shifts-admin-tbody", adminShiftRenderer);
//             // shiftsAdminList.render();

//             // const availableShiftsListAdmin = requestedShiftsList.filter((shift) => !shift.shiftIsTaken);
//             // const adminAvaliableShiftList = new ListRenderer(availableShiftsListAdmin, "#availableShifts-admin-tbody", adminViewAvaliableShiftRenderer, "#assign-btn");
//             // adminAvaliableShiftList.render();

//             // const userListForAdmin = new ListRenderer(
//             //     substitutes,
//             //     "#substitutes-list-admin-tbody",
//             //     adminViewSubstitutesRenderer,
//             //     "#update-substitute-btn",
//             //     "#delete-substitute-btn"
//             // );
//             // userListForAdmin.render();
//         } else if (!employee.IsAdmin) {
//             // // Create an instance of Renderers
//             // const substituteRenderer = new Substituterenderer();
//             // const MyShiftsrenderer = new MyShiftsRenderer();
//             // const availableShiftsRenderer = new AvailableShiftsRenderer();

//             // // Convert shift.id to string before comparison
//             // const shiftsOfLoggedInEmployee = shifts.filter((shift) => String(shift.employeeID) === String(loggedInEmployeeID));
//             // const myShifts = new ListRenderer(shiftsOfLoggedInEmployee, "#myShifts", MyShiftsrenderer);
//             // myShifts.render();

//             // const specificSubstitute = substitutes.filter((substitute) => substitute.id === loggedInEmployeeID);
//             // const substitute = new ListRenderer(specificSubstitute, ".my-info", substituteRenderer);
//             // substitute.render();
//             // substituteRenderer.attachEventListener(substitute);

//             // const displayAvailableShifts = shifts.filter((shift) => !shift.shiftIsTaken);
//             // const availableShiftsSubstitutes = new ListRenderer(displayAvailableShifts, "#availableShifts", availableShiftsRenderer);
//             // availableShiftsSubstitutes.render();
//             // availableShiftsRenderer.attachEventListener();

//             // // add sort eventlisteners mine vagter
//             // document.querySelector("#shifts-table-headers").addEventListener("click", (event) => {
//             //     const targetId = event.target.id;
//             //     if (targetId === "shift-date") {
//             //         myShifts.sort("date");
//             //     } else if (targetId === "shifts-shift-time") {
//             //         myShifts.sort("shiftStart");
//             //     } else if (targetId === "shift-hours") {
//             //         myShifts.sort("shiftLength");
//             //     }
//             // });

//             // // add sort eventlisteners ledige vagter
//             // document.querySelector("#available-shifts-table-headers").addEventListener("click", (event) => {
//             //     const targetId = event.target.id;
//             //     if (targetId === "shift-date") {
//             //         availableShiftsSubstitutes.sort("date");
//             //     } else if (targetId === "available-shift-time") {
//             //         availableShiftsSubstitutes.sort("shiftStart");
//             //     }
//             // });
//         }
// }
export {
    endpoint,
    initApp,
    loginAsAdmin,
    loginAsSubstitute,
    employee,
    loggedInEmployeeID,
    shiftInterests,
    substitutes,
    requestedShiftsList,
    buildShiftsList,
    buildRequestedShiftsList,
};
