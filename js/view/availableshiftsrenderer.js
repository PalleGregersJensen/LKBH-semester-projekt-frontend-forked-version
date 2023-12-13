// import { createShiftInterest } from "../helpers.js";
// import { loggedInEmployeeID } from "../main.js";
import { createShiftRequest } from "../controller/rest-service.js";

export class AvailableShiftsRenderer {
    render(shift) {
        // const convertedShiftStart = convertTo24HourFormat(shift.ShiftStart);
        // const convertedShiftEnd = convertTo24HourFormat(shift.ShiftEnd);
        // const formattedDate = formatShiftDate(shift.Date);
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

// render(shift) {
//     // const convertedShiftStart = convertTo24HourFormat(shift.ShiftStart);
//     // const convertedShiftEnd = convertTo24HourFormat(shift.ShiftEnd);
//     // const formattedDate = formatShiftDate(shift.Date);
//     const html = /*html*/ `
// <tr>
//   <td>${shift.date}</td>
//   <td>${shift.shiftStart} - ${shift.shiftEnd}</td>
//   <td>
//     <button class="shift-interest-button" data-shift-id="${shift.id}" data-shift="${encodeURIComponent(JSON.stringify(shift))}">Byd på vagt</button>
//   </td>
// </tr>`;

//     return html;
// }

//     attachEventListener() {
//         document.querySelectorAll(".shift-interest-button").forEach((button) => {
//             button.addEventListener("click", this.confirmInterest.bind(this));
//         });
//     }

//     confirmInterest(event) {
//         const shiftID = Number(event.target.dataset.shiftId);
//         console.log(shiftID);
//         const shift = JSON.parse(decodeURIComponent(event.target.dataset.shift));
//         const date = shift.date;
//         const shiftStart = shift.shiftStart;
//         const shiftEnd = shift.shiftEnd;

//         document.querySelector("#confirmInterestText").textContent = `Er du sikker på, at du vil byde på denne vagt: ${date}, kl.: ${shiftStart} - ${shiftEnd}?`;

//         const confirmInterestBtn = document.querySelector("#confirmInterest-btn");

//         // Remove previous event listener for confirmInterest-btn
//         confirmInterestBtn.removeEventListener("click", this.handleConfirmInterestClick);

//         // Add a new event listener for confirmInterest-btn using an arrow function
//         confirmInterestBtn.addEventListener(
//             "click",
//             () => {
//                 this.handleConfirmInterestClick(shiftID);
//             },
//             { once: true }
//         );

//         document.querySelector("#shiftInterest-dialog").showModal();
//     }

//     handleConfirmInterestClick(shiftID) {
//         createShiftInterest(shiftID, loggedInEmployeeID);
//         document.querySelector("#shiftInterest-dialog").close();
//     }
// }
