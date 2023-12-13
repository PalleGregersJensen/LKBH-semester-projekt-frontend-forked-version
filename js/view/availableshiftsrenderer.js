import { createShiftRequest } from "../controller/rest-service.js";

export class AvailableShiftsRenderer {
    render(shift) {
        const html = /*html*/ `
                    <tr>
                      <td>${shift.date}</td>
                      <td>${shift.shiftStart} - ${shift.shiftEnd}</td>
                      <td>
                        <button id="request-shift-btn">Byd på vagt</button>
                      </td>
                    </tr>
                  `;

        return html;
    }

    postRenderer(shift, button) {
        button.addEventListener("click", () => {
            const shiftID = shift.id;
            const substituteID = JSON.parse(localStorage.getItem("currentUser")).EmployeeID;

            createShiftRequest(substituteID, shiftID);
        });
    }
}
