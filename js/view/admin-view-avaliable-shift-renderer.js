//A class with a render function that return html code to be inserted with listrenderer
export class AdminViewAvaliableShiftRenderer {
    render(shift) {
        const html = /*html*/ `
        <tr>
            <td>${shift.timeDK}</td>
            <td>${shift.hoursStartEnd}</td>
            <td>${shift.numberOfRequests}</td>
            <td><button id="assign-btn" class="btnStyling">Tildel vagt</button></td>
        </tr>
        `;

        return html;
    }

    //postRenderer for adding eventlisteners on buttons and adding html option elements for dialog
    postRenderer(shift, button) {
        button.addEventListener("click", () => {
            const form = document.querySelector("#form-admin-assign-shift");
            const selectElement = document.querySelector("#select-substitute");
            selectElement.innerHTML = "";

            //addin option elements
            if (shift.fullName && shift.fullName.length > 0) {
                for (let i = 0; i < shift.fullName.length; i++) {
                    const option = document.createElement("option");
                    option.value = shift.fullName[i];
                    option.text = shift.fullName[i];
                    selectElement.appendChild(option);
                }
            }

            //Date header
            form.querySelector("#form-assign-shift-header").textContent = shift.timeDK;
            form.formAssignShiftID.value = shift.shiftID; //hidden

            //setting first substitute name as ID default
            if (shift.fullName) {
                form.formAssignSubstituteID.value = shift.interestedEmployeeIDs[0]; //hidden
            } else {
                form.formAssignSubstituteID.value = null;
            }

            //Changing ID if name is changed
            selectElement.addEventListener("change", () => {
                if (shift.fullName) {
                    for (let i = 0; i < shift.fullName.length; i++) {
                        if (shift.fullName[i] === selectElement.value) {
                            form.formAssignSubstituteID.value = shift.interestedEmployeeIDs[i];
                        }
                    }
                }
            });

            document.querySelector("#dialog-admin-assign-shift").showModal();
        });
    }
}
