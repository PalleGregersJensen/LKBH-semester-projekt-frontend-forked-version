import { createShiftInterest } from "./helpers.js";
import { loggedInEmployeeID} from "./main.js"

export class AvailableShiftsRenderer {
  render(shift) {
    const convertedShiftStart = convertTo24HourFormat(shift.ShiftStart);
    const convertedShiftEnd = convertTo24HourFormat(shift.ShiftEnd);
    const formattedDate = formatShiftDate(shift.Date);
    const html = /*html*/`
      <tr>
        <td>${formattedDate}</td>
        <td>${convertedShiftStart} - ${convertedShiftEnd}</td>
        <td> <button class="shift-interest-button" data-shift-id="${shift.ShiftID}" data-formatted-date="${formattedDate}" data-shift-start="${convertedShiftStart}" data-shift-end="${convertedShiftEnd}">Byd på vagt</button> </td>
      </tr>`;

    return html;
  }

  attachEventListener() {
    document.querySelectorAll(".shift-interest-button").forEach(button => {
      button.addEventListener("click", this.confirmInterest.bind(this));
    });
  }

  confirmInterest(event) {
    const shiftID = Number(event.target.dataset.shiftId);
    console.log(shiftID);
    const formattedDate = event.target.dataset.formattedDate;
    const convertedShiftStart = event.target.dataset.shiftStart;
    const convertedShiftEnd = event.target.dataset.shiftEnd;
  
    document.querySelector("#confirmInterestText").textContent = `Er du sikker på, at du vil byde på denne vagt: ${formattedDate}, kl.: ${convertedShiftStart} - ${convertedShiftEnd}?`;
  
    const confirmInterestBtn = document.querySelector("#confirmInterest-btn");
  
    // Remove previous event listener for confirmInterest-btn
    confirmInterestBtn.removeEventListener("click", this.handleConfirmInterestClick);
  
    // Add a new event listener for confirmInterest-btn using an arrow function
    confirmInterestBtn.addEventListener("click", () => {
      this.handleConfirmInterestClick(shiftID);
    }, { once: true });
  
    document.querySelector("#shiftInterest-dialog").showModal();
  }
  
  handleConfirmInterestClick(shiftID) {
    createShiftInterest(shiftID, loggedInEmployeeID);
    document.querySelector("#shiftInterest-dialog").close();
  }
  
}
  
  // Function to convert ISO date and time to 24-hour format
function convertTo24HourFormat(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
  
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }  

  function formatShiftDate(dateString) {
    const options = { weekday: "long", day: "numeric", month: "short", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleString("da", options);
  }
  
