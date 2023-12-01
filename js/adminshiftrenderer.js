import { substitutes } from "./main.js";

export class AdminShiftRenderer {
    render(shift) {
        const formattedDate = formatShiftDate(shift.Date);
        const convertedShiftStart = convertTo24HourFormat(shift.ShiftStart);
        const convertedShiftEnd = convertTo24HourFormat(shift.ShiftEnd);
        const fullNameToTable = getFullName(shift);

        const html = /*html*/ `
        <tr>
            <td>${formattedDate}</td>
            <td>${convertedShiftStart} - ${convertedShiftEnd}</td>
            <td>${fullNameToTable}</td>
        </tr>
        `;

        return html;
    }
}

function formatShiftDate(dateString) {
    const options = { weekday: "long", day: "numeric", month: "short", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleString("da", options);
}

// Function to convert ISO date and time to 24-hour format
function convertTo24HourFormat(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();

    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
}

function getFullName(shift) {
    let fullName;

    const matchingSubstitute = substitutes.filter((substitute) => substitute.EmployeeID === shift.EmployeeID);
    console.log(matchingSubstitute);

    if (matchingSubstitute[0]) {
        return (fullName = `${matchingSubstitute[0].FirstName} ${matchingSubstitute[0].LastName}`);
    } else {
        return "...";
    }
}
