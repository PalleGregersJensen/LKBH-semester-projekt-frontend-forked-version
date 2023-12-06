//En klasse med render metode(funktion) der returnerer et stykke html kode som bruges i listRenderer
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

    //postRenderer til at sætte eventlistener på button samt tilføje html option elementer til dialog mm.
    postRenderer(button, shift) {
        button.addEventListener("click", () => {
            const form = document.querySelector("#form-admin-assign-shift");
            const selectElement = document.querySelector("#select-substitute");
            selectElement.innerHTML = "";

            //option elementer tilføjes
            if (shift.fullname && shift.fullname.length > 0) {
                for (let i = 0; i < shift.fullname.length; i++) {
                    const option = document.createElement("option");
                    option.value = shift.fullname[i];
                    option.text = shift.fullname[i];
                    selectElement.appendChild(option);
                }
            }

            //Overskrift i form af vagtens dato
            form.querySelector("#form-assign-shift-header").textContent = shift.timeDK;
            form.formAssignShiftID.value = shift.shiftID; //hidden

            //sætter vikar id til første navn på options default navn
            if (shift.fullname) {
                form.formAssignSubstituteID.value = shift.interestedEmployeeIDs[0]; //hidden
            } else {
                form.formAssignSubstituteID.value = null;
            }

            //hvis man vælger et andet navn så sættes det respektive id også i formen
            selectElement.addEventListener("change", () => {
                if (shift.fullname) {
                    for (let i = 0; i < shift.fullname.length; i++) {
                        if (shift.fullname[i] === selectElement.value) {
                            form.formAssignSubstituteID.value = shift.interestedEmployeeIDs[i];
                        }
                    }
                }
            });

            document.querySelector("#dialog-admin-assign-shift").showModal();
        });
    }
}
