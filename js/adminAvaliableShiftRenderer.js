export class AdminAvaliableShiftRenderer {
    render(shift) {
        const convertedShiftStart = convertTo24HourFormat(shift.ShiftStart);
        const convertedShiftEnd = convertTo24HourFormat(shift.ShiftEnd);
        const formattedDate = formatShiftDate(shift.Date);
        const requestedBy = shift.EmployeeID;

        console.log(shift);

        const html = /*html*/ `
        <tr>
            <td>${formattedDate}</td>
            <td>${convertedShiftStart} - ${convertedShiftEnd}</td>
            <td>${requestedBy}</td>
            <td><button class="btnStyling">Tildel vagt</button></td>
        </tr>
        `;

        return html;
    }
}

// Function to convert ISO date and time to 24-hour format
function convertTo24HourFormat(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();

    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
}

function formatShiftDate(dateString) {
    const options = { weekday: "long", day: "numeric", month: "short", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleString("da", options);
}
