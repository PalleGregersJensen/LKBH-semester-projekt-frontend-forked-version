export class AvailableShiftsRenderer {
    render(shift) {
      const convertedShiftStart = convertTo24HourFormat(shift.ShiftStart);
      const convertedShiftEnd = convertTo24HourFormat(shift.ShiftEnd);
      const formattedDate = formatShiftDate(shift.Date);
      const html = /*html*/`
        <tr>
          <td>${formattedDate}</td>
          <td>${convertedShiftStart} - ${convertedShiftEnd}</td>
           <td> <button id= "shiftinterestbutton">Byd på vagt</button> </td>       </tr>`;
  
      return html;
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
  
  // Example usage:
  const formattedDate = formatShiftDate("2023-12-06T23:00:00.000Z");
  console.log(formattedDate);  // This should output something like "Tir. d. 06/12-2023"
