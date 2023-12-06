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

    postRenderer(substitute, button1, button2) {
        //adding event listener to "update"(button1) button
        button1.addEventListener("click", () => {
            console.log("update substitute clicked")
        });
        
        button2.addEventListener("click", () => {
            console.log("delete substitute clicked")
        });
    }
}
