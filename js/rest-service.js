import { buildShiftsList, buildRequestedShiftsList, } from "./main.js";

const endpoint = "http://localhost:3333";

// get Json-data
async function getSubstitutesData() {
    const response = await fetch(`${endpoint}/substitutes`);
    const data = await response.json();
    return data;
}

// get Json-data
async function getShiftData() {
    const response = await fetch(`${endpoint}/shifts`);
    const data = await response.json();
    return data;
}

async function getShiftInterestData() {
    const response = await fetch(`${endpoint}/shiftInterests`);
    const data = await response.json();
    return data;
}

//Fetcher "/shifts/requestedshifts" fra endpoint og returnere resultat som js objekt
async function getRequestedShifts() {
    const response = await fetch(`${endpoint}/shifts/requestedshifts`);
    const data = response.json();
    return data;
}

//Opdatere ttildeling af vagt
async function assignSubstitute(event) {
    event.preventDefault();
    const form = event.target;

    const shiftID = Number(form.formAssignShiftID.value);
    const employeeID = Number(form.formAssignSubstituteID.value);
    const bodyToUpdate = { EmployeeID: employeeID, ShiftID: shiftID };

    const response = await fetch(`${endpoint}/shifts/${shiftID}`, {
        method: "put",
        headers: { "content-type": "application/json" },
        // Convert body to JSON string before sending it to the API
        body: JSON.stringify(bodyToUpdate),
    });

    document.querySelector("#dialog-admin-assign-shift").close();
    buildRequestedShiftsList(); // opdater liste... virker ikke før logud og login påny
    buildShiftsList(); // opdater liste... virker ikke før logud og login påny
}

export { getShiftData, getSubstitutesData, getShiftInterestData, getRequestedShifts, assignSubstitute };
