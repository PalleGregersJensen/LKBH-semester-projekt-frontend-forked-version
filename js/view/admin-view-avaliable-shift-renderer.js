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

    postRenderer(button, shift) {
        button.addEventListener("click", () => {

            const form = document.querySelector("#form-admin-assign-shift");
            const selectElement = document.querySelector("#select-substitute");
            
            for (let i = 0; i < shift.fullname.length; i++) {
                const option = document.createElement("option");
                option.value = shift.fullname[i];
                option.text = shift.fullname[i];
                selectElement.appendChild(option);
            }
            
            form.querySelector("#form-assign-shift-header").textContent = shift.timeDK;
            form.formAssignShiftID.value = shift.shiftID
            form.formAssignSubstituteID.value = shift.interestedEmployeeIDs[0];;
            
            selectElement.addEventListener("change", () => {
                
                for (let i = 0; i < shift.fullname.length; i++) {
                    if (shift.fullname[i] === selectElement.value) {
                    form.formAssignSubstituteID.value = shift.interestedEmployeeIDs[i];
                    }
                }
            });

            document.querySelector("#dialog-admin-assign-shift").showModal();
        });

    }
}
