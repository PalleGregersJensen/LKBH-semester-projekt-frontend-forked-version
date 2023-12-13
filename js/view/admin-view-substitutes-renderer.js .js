export class AdminViewSubstitutesRenderer {
    render(substitute) {
        const fullName = `${substitute.firstName} ${substitute.lastName}`;
        const memberNumber = substitute.id;
        const phoneNumber = String(substitute.number);

        const html = /*html*/ `
            <tr>
                <td>${fullName}</td>
                <td>${memberNumber}</td>
                <td>${phoneNumber}</td>
                <td><button id="update-substitute-btn" class="btnStyling">Opdater</button></td>
                <td><button id="delete-substitute-btn" class="btnStyling">Fjern</id=button></td>
            </tr>
        `;
        return html;
    }

    //postRenderer for update and delete buttons on list of substitutes
    postRenderer(substitute, button1, button2) {
        //adding eventlisteners to "opdater" button (button1)
        button1.addEventListener("click", () => {
            const form = document.querySelector("#form-admin-update-substitute");

            form.formUpdateEmployeeID.value = substitute.id; // hidden
            form.firstname.value = substitute.firstName;
            form.lastname.value = substitute.lastName;
            form.dateofbirth.value = substitute.formBirthdate;
            form.mail.value = substitute.mail;
            form.phonennumber.value = substitute.number;
            if (substitute.isAdmin === 1) {
                form.querySelector("#form-admin-update-substitute-is-admin").checked = true;
            } else {
                form.querySelector("#form-admin-update-substitute-is-not-admin").checked = true;
            }
            form.username.value = substitute.userName;

            document.querySelector("#dialog-admin-update-substitute").showModal();
        });

        //adding eventlistener to "fjern" button (button2)
        button2.addEventListener("click", () => {
            const form = document.querySelector("#form-delete-substitute");

            // header set to name of respective substitute
            form.querySelector("#name-to-delete").textContent = substitute.fullName;
            // sets the form id value to the respective substitute
            form.formDeleteEmployeeID.value = substitute.id;

            // closing dialog
            document.querySelector("#dialog-delete-substitute").showModal();
        });
    }
}
