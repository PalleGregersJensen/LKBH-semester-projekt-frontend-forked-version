export class AdminViewSubstitutesRenderer {
    render(substitute) {
        const fullnName = `${substitute.firstName} ${substitute.lastName}`;
        const memberNumber = substitute.id;
        const phoneNumber = String(substitute.number);

        const html = /*html*/ `
            <tr>
                <td>${fullnName}</td>
                <td>${memberNumber}</td>
                <td>${phoneNumber}</td>
                <td><button id="update-substitute-btn" class="btnStyling">Opdater</button></td>
                <td><button id="delete-substitute-btn" class="btnStyling">Fjern</id=button></td>
            </tr>
        `;
        return html;
    }
}
