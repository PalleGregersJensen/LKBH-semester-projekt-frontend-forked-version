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
    postRenderer(shift, button) {
        button.addEventListener("click", () => {
            const form = document.querySelector("#form-admin-assign-shift");
            const selectElement = document.querySelector("#select-substitute");
            selectElement.innerHTML = "";
            console.log(shift);

            //option elementer tilføjes
            if (shift.fullName && shift.fullName.length > 0) {
                for (let i = 0; i < shift.fullName.length; i++) {
                    const option = document.createElement("option");
                    option.value = shift.fullName[i];
                    option.text = shift.fullName[i];
                    selectElement.appendChild(option);
                }
            }

            //Overskrift i form af vagtens dato
            form.querySelector("#form-assign-shift-header").textContent = shift.timeDK;
            form.formAssignShiftID.value = shift.shiftID; //hidden

            //sætter vikar id til første navn på options default navn
            if (shift.fullName) {
                form.formAssignSubstituteID.value = shift.interestedEmployeeIDs[0]; //hidden
            } else {
                form.formAssignSubstituteID.value = null;
            }

            //hvis man vælger et andet navn så sættes det respektive id også i formen
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
