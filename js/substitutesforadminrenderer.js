export class SubstitutesForAdminRenderer {
    render(user) {
        const userName = `${user.FirstName} ${user.LastName}`;
        const userNumber = user.EmployeeID;
        const phoneNumber = String(user.Number);

        const html = /*html*/ `
            <tr>
                <td>${userName}</td>
                <td>${userNumber}</td>
                <td>${phoneNumber}</td>
                <td><button id="update-substitute-btn" class="btnStyling">Opdater</button></td>
                <td><button id="delete-substitute-btn" class="btnStyling">Fjern</id=button></td>
            </tr>
        `;
        return html;
    }
}
