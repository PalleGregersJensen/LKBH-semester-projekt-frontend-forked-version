import {endpoint} from "./main.js"
async function createShiftInterest(ShiftID, EmployeeID){
    const newShiftInterest = {ShiftID, EmployeeID};

    const newShiftInterestJSON = JSON.stringify(newShiftInterest);
    console.log(newShiftInterestJSON);
    const response = await fetch(`${endpoint}/shiftInterests`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: newShiftInterestJSON,
    });
    return response;
}

async function updateLoginInfo(mail, number, username, password, EmployeeID){
    const newLoginInfo = {Mail: mail, Number: number, Username: username, PasswordHash: password};

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

export {createShiftInterest, updateLoginInfo};