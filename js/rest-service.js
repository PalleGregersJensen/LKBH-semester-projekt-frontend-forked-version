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

async function getShiftInterestData(){
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

function assignSubstitute(event) {
    event.preventDefault();
    console.log("assignSubstitute called");
    // const form = event.target

    document.querySelector("#dialog-admin-assign-shift").close();
}
export { getShiftData, getSubstitutesData, getShiftInterestData, getRequestedShifts };
