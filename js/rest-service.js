import { buildShiftsList, buildRequestedShiftsList } from "./main.js";

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

// Slet vikar
async function deleteSubstitute(event) {
    event.preventDefault();
    const form = event.target;

    const employeeID = Number(form.formDeleteEmployeeID.value);
    const bodyToUpdate = { EmployeeID: employeeID };
    console.log(bodyToUpdate);

    const response = await fetch(`${endpoint}/substitutes/${employeeID}`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(bodyToUpdate),
    });

    if (response.ok) {
        console.log("Vikar slettet!");
    } else {
        console.log("Noget gik galt, vikaren er IKKE slettet!");
    }

    document.querySelector("#dialog-delete-substitute").close();
    //opdater buildListe ----> ?
}

export { getShiftData, getSubstitutesData, getShiftInterestData, getRequestedShifts, assignSubstitute, deleteSubstitute };
