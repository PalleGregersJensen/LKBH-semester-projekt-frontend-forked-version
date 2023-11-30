export class ShiftsAdminRenderer {
    render(shift) {
        const formattedDate = formatShiftDate(shift.Date);

        const html = /*html*/ `
            <td>${formattedDate}</td>
        `;

        return html;
    }
}

function formatShiftDate(dateString) {
    const options = { weekday: "long", day: "numeric", month: "short", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleString("da", options);
}
