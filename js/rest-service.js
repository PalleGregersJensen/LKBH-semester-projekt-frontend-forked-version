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

export {getShiftData, getSubstitutesData};