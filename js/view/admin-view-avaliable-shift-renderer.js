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
            // console.log(shift)

            const selectElement = document.querySelector("#select-substitute");
            
            for (let i = 0; i < shift.firstNames.length; i++) {
                const option = document.createElement("option");
                option.value = shift.firstNames[i];
                option.text = shift.firstNames[i];
                selectElement.appendChild(option);
            }
            document.querySelector("#dialog-admin-assign-shift").showModal();
        });

    }
}
