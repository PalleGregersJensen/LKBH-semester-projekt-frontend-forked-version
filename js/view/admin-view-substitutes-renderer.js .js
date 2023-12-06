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

    //postRenderer til update og delete knapper på admins liste over vikarer
    postRenderer(substitute, button1, button2) {
        //tilføjer event listener ti "opdater"(button1) knap
        button1.addEventListener("click", () => {
            console.log("update substitute clicked");
        });

        //tilføjer event listener til "fjern"(button2) knap
        button2.addEventListener("click", () => {
            const form = document.querySelector("#form-delete-substitute");

            // sætter overskrift i dialog vindue til navnet på den pågældende vikar
            form.querySelector("#name-to-delete").textContent = substitute.fullName;
            // vidergiver den pågældende vikars id til delete form
            form.formDeleteEmployeeID.value = substitute.id;

            // lukker dialog vindue
            document.querySelector("#dialog-delete-substitute").showModal();
        });
    }
}
