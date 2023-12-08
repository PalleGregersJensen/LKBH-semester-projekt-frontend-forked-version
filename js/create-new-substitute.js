import { endpoint, initApp } from "./main.js";
import { viewChange } from "./view-router.js";

// Create new substitute clicked
function createNewSubstituteClicked() {
    console.log("Opret ny vikar klik");
    document.querySelector("#dialog-create-new-substitute").showModal();
}

// Create new substitute
async function createNewSubstitute(event) {
    event.preventDefault();
    console.log("Opret ny vikar");
    const form = event.target;
    // console.log(form);
    const firstName = form.firstname.value;
    // console.log(firstName);
    const lastName = form.lastname.value;
    // console.log(lastName);
    const dateOfBirth = form.elements["date-of-birth"].value;
    // console.log(dateOfBirth);
    const mail = form.mail.value;
    // console.log(mail);
    const number = form.elements["phone-number"].value;
    // console.log(number);
    let adminStatus = form.elements["admin-status"].value;
    if (adminStatus === "is-not-admin") {
        adminStatus = false;
    } else if (adminStatus === "is-admin") {
        adminStatus = true;
    }
    // console.log(adminStatus);
    const userName = form.username.value;
    // console.log(userName);
    const password = form.password.value;
    // console.log(password);

    const user = {
        FirstName: firstName,
        LastName: lastName,
        DateOfBirth: dateOfBirth,
        Mail: mail,
        Number: number,
        IsAdmin: adminStatus,
        Username: userName,
        PasswordHash: password,
    };
    const userAsJson = JSON.stringify(user);
    // console.log(userAsJson);
    const response = await fetch(`${endpoint}/substitutes/`, {
        method: "POST",
        body: userAsJson,
        headers: {
            "content-Type": "application/json",
        },
    });

    if (response.ok) {
        // if success, close dialog tag
        console.log("New user in database");
        document.querySelector("#dialog-create-new-substitute").close();

        // Probably needs to be changed to updateList or something like that
        // initApp();
        viewChange();
    } else {
        document.querySelector("#dialog-error-message-create-substitute").showModal();
        document.querySelector("#error-message-create-substitute-btn").addEventListener("click", closeErrorMessageInCreateSubstitute);
    }
}

// Close error message
function closeErrorMessageInCreateSubstitute() {
    document.querySelector("#dialog-error-message-create-substitute").close();
}

// Close dialog window
function closeCreateNewSubstituteDialog() {
    console.log("close create new substitute dialog");
    document.querySelector("#dialog-create-new-substitute").close();
}

export { createNewSubstituteClicked, createNewSubstitute, closeCreateNewSubstituteDialog };
