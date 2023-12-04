import { endpoint } from "./main.js";

// Create new shift clicked
function createNewShiftClicked() {
    console.log("create new shift clicked");
    document.querySelector("#dialog-create-new-shift").showModal();
}

// Create new shift
async function createNewShift(event) {
    event.preventDefault();
    console.log("create new shift");
    const form = event.target;
    console.log(form);
    const shiftDate = form.elements['shift-date'].value;
    console.log(shiftDate);
    const shiftStart = form.elements['shift-start'].value;
    console.log(shiftStart);
    const shiftEnd = form.elements['shift-end'].value;
    console.log(shiftEnd);

    const newShift = {
        Date: shiftDate,
        ShiftStart: shiftStart,
        ShiftEnd: shiftEnd
    }
    console.log(newShift);
    const newShiftAsJson = JSON.stringify(newShift);
    const response = await fetch(`${endpoint}/shifts/`, {
        method: "POST",
        body: newShiftAsJson,
        headers: {
            "content-Type": "application/json",
        },
    });
    if (response.ok) {
        // if success, start the app and update artists grid
        console.log("New shift in database");
        document.querySelector("#dialog-create-new-shift").close();

        // Probably needs to be changed to updateList or something like that
        initApp();
    }

}

export { createNewShiftClicked, createNewShift };
