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

async function assignSubstitute(event) {
    event.preventDefault();
    const form = event.target;

    const shiftID = form.formAssignShiftID.value;
    const employeeID = form.formAssignSubstituteID.value;
    const bodyToUpdate = { EmployeeID: employeeID, ShiftID: shiftID };
    console.log(bodyToUpdate);

    const response = await fetch(`${endpoint}/shifts/${shiftID}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: bodyToUpdate,
    });

    document.querySelector("#dialog-admin-assign-shift").close();
    return response;
}
export { getShiftData, getSubstitutesData, getShiftInterestData, getRequestedShifts, assignSubstitute };
