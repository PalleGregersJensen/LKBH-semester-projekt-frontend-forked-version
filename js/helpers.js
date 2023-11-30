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

export {createShiftInterest};