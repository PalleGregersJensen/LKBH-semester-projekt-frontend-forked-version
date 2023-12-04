import { requestedShiftsList } from "../main.js";

//En klasse med render metode(funktion) der returnerer et stykke html kode som bruges i listRenderer
export class AdminAvaliableShiftRenderer {
    render(shift) {
        // const convertedShiftStart = convertTo24HourFormat(shift.shiftStart);
        // const convertedShiftEnd = convertTo24HourFormat(shift.shiftEnd);
        // const formattedDate = formatShiftDate(shift.date);
        // const requestedBy = getFullNameOfInterested(shift);
        // const requestedBy = shift.numberOfRequests;

        const html = /*html*/ `
        <tr>
            <td>${shift.timeDK}</td>
            <td>${shift.hoursStartEnd}</td>
            <td>${shift.numberOfRequests}</td>
            <td><button id="assign-shift-to-substitute-btn" class="btnStyling">Tildel vagt</button></td>
        </tr>
        `;

        return html;
    }
}

// returnere navne på de vikarer der har vist interesse i en vagt
// function getFullNameOfInterested(shift) {
//     const requestedShift = requestedShiftsList.find((item) => item.shiftID === shift.shiftID);

//     if (requestedShift.firstName && requestedShift.lastName) {
//         let fullNames = [];

//         for (let i = 0; i < requestedShift.firstName.length; i++) {
//             fullNames.push(`- ${requestedShift.firstName[i]} ${requestedShift.lastName[i]}`);
//         }

//         return fullNames.join("<br>");
//     } else {
//         return "Ingen anmodninger/bud";
//     }
// }

//Function to convert ISO date and time to 24-hour format
// function convertTo24HourFormat(dateTimeString) {
//     const dateTime = new Date(dateTimeString);
//     const hours = dateTime.getHours();
//     const minutes = dateTime.getMinutes();

//     return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
// }

// Shift/vagt dato property bliver lavet om til dansk dato format
// function formatShiftDate(dateString) {
//     const options = { weekday: "long", day: "numeric", month: "short", year: "numeric" };
//     const date = new Date(dateString);
//     return date.toLocaleString("da", options);
// }
