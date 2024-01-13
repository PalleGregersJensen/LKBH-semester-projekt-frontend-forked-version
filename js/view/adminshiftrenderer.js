export class AdminShiftRenderer {
    render(shift) {
        const html = /*html*/ `
        <tr>
            <td>${shift.date}</td>
            <td>${shift.shiftStart} - ${shift.shiftEnd}</td>
            <td>${shift.fullName}</td>
            <td><button id="update-shift-btn" class="btnStyling">Opdater</button></td>
            <td><button id="delete-shift-btn" class="btnStyling">Fjern</button></td>
        </tr>
        `;

        return html;
    }

    //postRenderer for update and delete buttons on list of shifts
    postRenderer(shift, button1, button2) {
        //adding eventlisteners to "opdater" button (button1)
        button1.addEventListener("click", () => {
            // const form = document.querySelector("#form-admin-update-shift");

            // form.formUpdateEmployeeID.value = shift.id; // hidden
            // form.firstname.value = substitute.firstName;
            // form.lastname.value = substitute.lastName;
            // form.dateofbirth.value = substitute.formBirthdate;
            // form.mail.value = substitute.mail;
            // form.phonennumber.value = substitute.number;
            // if (substitute.isAdmin === 1) {
            //     form.querySelector("#form-admin-update-substitute-is-admin").checked = true;
            // } else {
            //     form.querySelector("#form-admin-update-substitute-is-not-admin").checked = true;
            // }
            // form.username.value = substitute.userName;

            document.querySelector("#dialog-admin-update-shift").showModal();
        });

        //adding eventlistener to "fjern" button (button2)
        button2.addEventListener("click", () => {
            console.log(shift);
            const form = document.querySelector("#form-delete-shift");

            // header set to name of respective substitute
            form.querySelector(
                "#shift-to-delete"
            ).textContent = `Vil du slette vagten ${shift.date} fra kl. ${shift.shiftStart}-${shift.shiftEnd}`;
            // sets the form id value to the respective substitute
            form.formDeleteShiftID.value = shift.id;

            // closing dialog
            document.querySelector("#dialog-delete-shift").showModal();
        });
    }
}



