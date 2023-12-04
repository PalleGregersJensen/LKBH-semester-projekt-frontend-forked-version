import { endpoint } from "./main.js";

function createNewSubstituteClicked() {
    console.log("Opret ny vikar klik");
    document.querySelector("#dialog-create-new-substitute").showModal();
}

async function createNewSubstitute(event) {
    event.preventDefault();
    console.log("Opret ny vikar");
    const form = event.target;
    console.log(form);
    const firstName = form.firstname.value;
    console.log(firstName);
    const lastName = form.lastname.value;
    console.log(lastName);
    const dateOfBirth = form.elements["date-of-birth"].value;
    console.log(dateOfBirth);
    const mail = form.mail.value;
    console.log(mail);
    const number = form.elements["phone-number"].value;
    console.log(number);
    let adminStatus = form.elements["admin-status"].value;
    if (adminStatus === "is-not-admin") {
        adminStatus = false;
    } else if (adminStatus === "is-admin") {
        adminStatus = true;
    }
    console.log(adminStatus);
    const userName = form.username.value;
    console.log(userName);
    const password = form.password.value;
    console.log(password);

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
    const response = await fetch(`${endpoint}/substitutes/`, {
        method: "POST",
        body: userAsJson,
        headers: {
            "content-Type": "application/json",
        },
    });

    if (response.ok) {
        // if success, start the app and update artists grid
        console.log("New artist in database");
    }
}

function closeCreateNewSubstituteDialog() {
    console.log("close create new substitute dialog");
    document.querySelector("#dialog-create-new-substitute").close();
}

export { createNewSubstituteClicked, createNewSubstitute, closeCreateNewSubstituteDialog };
