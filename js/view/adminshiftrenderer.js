export class AdminShiftRenderer {
    render(shift) {

        const html = /*html*/ `
        <tr>
            <td>${shift.date}</td>
            <td>${shift.shiftStart} - ${shift.shiftEnd}</td>
            <td>${shift.fullName}</td>
        </tr>
        `;

        return html;
    }
}

