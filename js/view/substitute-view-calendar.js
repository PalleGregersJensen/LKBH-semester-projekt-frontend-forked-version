export class CalendarRenderer {
    render(shift, currentWeek) {
        // Check if the shift's weekNumber matches the currentWeek
        if (shift.weekNumber === currentWeek) {
            // Get the day index (0-6, where 0 is Sunday, 1 is Monday, etc.)
            const dayIndex = getDayIndex(shift.date);

            // Calculate the column index in the calendar based on the day index
            const columnIndex = (dayIndex + 6) % 7; // Adjust to start the week from Monday

            const html = /*html*/ `
                <tr data-week="${shift.weekNumber}" data-date="${shift.date}">
                    <td colspan="${columnIndex}"></td>
                    <td>Kl.: ${shift.shiftStart} - ${shift.shiftEnd}</td>
                </tr>`;
            return html;
        } else {
            // Return an empty string if the shift is not for the current week
            return "";
        }
    }
}

// Function to get the day index based on a date
function getDayIndex(date) {
    const daysOfWeek = [0, 1, 2, 3, 4, 5, 6]; // 0 is Sunday, 1 is Monday, etc.
    const currentDate = new Date(date);
    return daysOfWeek[currentDate.getDay()];
}
