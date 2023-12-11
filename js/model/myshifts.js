import { substitutes } from "../main.js";


export function construct(originalData) {
  const shiftObject = {
      id: originalData.ShiftID,
      employeeID: originalData.EmployeeID,
      shiftIsTaken: originalData.ShiftIsTaken,
      get date() {
          const options = { weekday: "long", day: "numeric", month: "short", year: "numeric" };
          const date = new Date(originalData.Date);
          return date.toLocaleString("da", options);
      },
      get monthFilter() {
        const date = new Date(originalData.Date);
        const monthNumber = date.getMonth() + 1; // Months are 0-indexed, so we add 1
        return monthNumber;
    },
      get shiftStart() {
          const dateTime = new Date(originalData.ShiftStart);
          const hours = dateTime.getHours();
          const minutes = dateTime.getMinutes();

          return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
      },
      get shiftEnd() {
          const dateTime = new Date(originalData.ShiftEnd);
          const hours = dateTime.getHours();
          const minutes = dateTime.getMinutes();

          return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
      },
      get shiftLength() {
          const startTime = new Date(originalData.ShiftStart);
          const endTime = new Date(originalData.ShiftEnd);

          // If endTime is earlier than startTime, it means the shift spans midnight
          if (endTime < startTime) {
              endTime.setDate(endTime.getDate() + 1); // Add a day to the endTime
          }

          const timeDifferenceInMilliseconds = Math.abs(endTime - startTime);
          const hours = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60));
          const minutes = Math.floor((timeDifferenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

          return { hours, minutes };
      },
      get fullName(){
      let fullName;

      const matchingSubstitute = substitutes.filter((substitute) => substitute.id === originalData.EmployeeID);
      // console.log(matchingSubstitute);
  
      if (matchingSubstitute[0]) {
          return (fullName = `${matchingSubstitute[0].firstName} ${matchingSubstitute[0].lastName}`);
      } else {
          return "...";
      }}
  };

  return shiftObject;
}
