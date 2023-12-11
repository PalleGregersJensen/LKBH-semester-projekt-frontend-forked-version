import { endpoint, shiftInterests } from "./main.js";
import { viewChange } from "./view-router.js";

async function createShiftInterest(ShiftID, EmployeeID, callback) {
    // Wait for the shiftInterests array to be populated
    await waitForShiftInterests();

    // Check if a shift interest with the same ShiftID and EmployeeID already exists
    const exists = shiftInterests.some(
        (interest) => interest.ShiftID === ShiftID && interest.EmployeeID === EmployeeID
    );

    if (exists) {
        console.log(`Shift interest with ShiftID ${ShiftID} and EmployeeID ${EmployeeID} already exists.`);
        document.querySelector("#existing-shiftInterest-entry").showModal();
    } else {
        console.log(`Creating new shift interest with ShiftID ${ShiftID} and EmployeeID ${EmployeeID}.`);

        const newShiftInterest = { ShiftID, EmployeeID };
        const newShiftInterestJSON = JSON.stringify(newShiftInterest);
        console.log(newShiftInterestJSON);

        const response = await fetch(`${endpoint}/shiftInterests`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: newShiftInterestJSON,
        });

        if (callback) {
            callback(response);
        }
    }
}

// Function to wait for shiftInterests to be populated
function waitForShiftInterests() {
    return new Promise((resolve) => {
        const intervalId = setInterval(() => {
            if (shiftInterests.length > 0) {
                clearInterval(intervalId);
                resolve();
            }
        }, 100);
    });
}

async function updateLoginInfo(username, password, EmployeeID) {
    console.log(EmployeeID);
    const newLoginInfo = { Username: username, PasswordHash: password };

    const newLoginInfoJSON = JSON.stringify(newLoginInfo);
    console.log(newLoginInfoJSON);
    const response = await fetch(`${endpoint}/substitutes/${EmployeeID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: newLoginInfoJSON,
    });
    return response;
}

export { createShiftInterest, updateLoginInfo };
