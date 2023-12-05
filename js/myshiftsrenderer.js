export class MyShiftsRenderer {
    render(shift) {
      const convertedShiftStart = convertTo24HourFormat(shift.ShiftStart);
      const convertedShiftEnd = convertTo24HourFormat(shift.ShiftEnd);
      const timeDifference = calculateTimeDifference(shift.ShiftStart, shift.ShiftEnd);
      const formattedDate = formatShiftDate(shift.Date);
      const html = /*html*/`
        <tr>
          <td>${formattedDate}</td>
          <td>${convertedShiftStart} - ${convertedShiftEnd}</td>
          <td>${timeDifference.hours} timer og ${timeDifference.minutes} minutter.</td>
        </tr>`;
  
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
  
  function calculateTimeDifference(startDateTimeString, endDateTimeString) {
    const startTime = new Date(startDateTimeString);
    const endTime = new Date(endDateTimeString);
  
    // If endTime is earlier than startTime, it means the shift spans midnight
    if (endTime < startTime) {
      endTime.setDate(endTime.getDate() + 1); // Add a day to the endTime
    }
  
    const timeDifferenceInMilliseconds = Math.abs(endTime - startTime);
    const hours = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifferenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
  
    return { hours, minutes };
  }
  

  function formatShiftDate(dateString) {
    const options = { weekday: "long", day: "numeric", month: "short", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleString("da", options);
  }
    

  export {formatShiftDate, calculateTimeDifference, convertTo24HourFormat};