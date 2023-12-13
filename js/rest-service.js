import { buildShiftsList, buildRequestedShiftsList } from "./main.js";
import { viewChange } from "./view-router.js";

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

async function updateLoginInfo() {
    const form = document.querySelector("#form-editLoginInfo-dialog");
    const employeeID = form.userID.value;
    const userName = form.editUsername.value;
    const passwordNew = form.editPassword.value;
    const passwordNewConfirm = form.confirmNewPassword.value;

    console.log(userName);
    console.log(passwordNew);

    if (passwordNew !== passwordNewConfirm) {
        console.log("password ikke ens");
        document.querySelector("#not-matching-passwords").showModal();
    } else {
        const bodyToUpdate = { Username: userName, PasswordHash: passwordNew, EmployeeID: employeeID };

        const response = await fetch(`${endpoint}/substitutes/${employeeID}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bodyToUpdate),
        });

        if (response.ok) {
            console.log("Dit password er nu ændret!");
        } else {
            console.log("Noget gik galt, dit password er IKKE ændret!");
        }
    }
    viewChange();
}

async function createShiftRequest(substituteID, shiftID) {
    const employeeID = substituteID;
    const requestedShiftID = shiftID;
    const bodyToPost = { ShiftID: requestedShiftID, EmployeeID: employeeID };

    const response = await fetch(`${endpoint}/shiftInterests`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(bodyToPost),
    });

    if (response.ok) {
        console.log("Dit bud er registreret!");
    } else {
        console.log("Dit bud blev ikke registreret! (måske har du allerede budt?)");
    }

    // viewChange();
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
    // buildRequestedShiftsList(); // opdater liste... virker ikke før logud og login påny
    // buildShiftsList(); // opdater liste... virker ikke før logud og login påny
    viewChange();
}

// Slet vikar
async function deleteSubstitute(event) {
    // forhindre default adfærd der refresher siden
    event.preventDefault();
    const form = event.target;

    const employeeID = Number(form.formDeleteEmployeeID.value);
    const bodyToDelete = { EmployeeID: employeeID };

    const response = await fetch(`${endpoint}/substitutes/${employeeID}`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(bodyToDelete),
    });

    if (response.ok) {
        console.log("Vikar slettet!");
    } else {
        console.log("Noget gik galt, vikaren er IKKE slettet!");
    }

    document.querySelector("#dialog-delete-substitute").close();

    viewChange();
}

// opdater vikar
async function updateSubstitute(event) {
    event.preventDefault();
    const form = event.target;

    const firstName = form.firstname.value;
    const lastName = form.lastname.value;
    const birthdate = form.dateofbirth.value;
    const mail = form.mail.value;
    const number = Number(form.phonennumber.value);
    // const isAdmin = form.querySelector("#form-admin-update-substitute-is-admin").checked;
    const userName = form.username.value;
    const id = Number(form.formUpdateEmployeeID.value);

    const bodyToUpdate = {
        FirstName: firstName,
        LastName: lastName,
        DateOfBirth: birthdate,
        Mail: mail,
        Number: number,
        Username: userName,
        EmployeeID: id,
    };

    console.log(bodyToUpdate);

    const response = await fetch(`${endpoint}/substitutes/admins/${id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(bodyToUpdate),
    });

    if (response.ok) {
        console.log("Brugeren er opdateret med succes!");
    } else {
        console.log("Noget gik galt, brugeren blev ikke opdateret!");
    }

    document.querySelector("#dialog-admin-update-substitute").close();

    viewChange();
}

export { getShiftData, getSubstitutesData, getShiftInterestData, getRequestedShifts, updateLoginInfo, createShiftRequest, assignSubstitute, updateSubstitute, deleteSubstitute };
