export function construct(dataObject) {
    const requestedShiftObject = {
        shiftID: dataObject.ShiftID,
        date: dataObject.Date,
        shiftStart: dataObject.ShiftStart,
        shiftEnd: dataObject.ShiftEnd,
        employeeID: dataObject.EmployeeID,
        shiftIsTaken: dataObject.ShiftIsTaken,
        fullname: dataObject.FullName,
        interestedEmployeeIDs: dataObject.InterestedEmployeeIDs,

        get timeDK() {
            const options = { weekday: "long", day: "numeric", month: "short", year: "numeric" };
            const date = new Date(this.date);
            return date.toLocaleString("da", options);
        },

        get hoursStartEnd() {
            const dateTimeStart = new Date(this.shiftStart);
            const hoursStart = dateTimeStart.getHours().toString().padStart(2, "0");
            const minutesStart = dateTimeStart.getMinutes().toString().padStart(2, "0");
            const startValue = `${hoursStart}:${minutesStart}`;

            const dateTimeEnd = new Date(this.shiftEnd);
            const hoursEnd = dateTimeEnd.getHours().toString().padStart(2, "0");
            const minutesEnd = dateTimeEnd.getMinutes().toString().padStart(2, "0");
            const endValue = `${hoursEnd}:${minutesEnd}`;

            return `${startValue} - ${endValue}`;
        },

        get numberOfRequests() {
            if (this.fullname) {
                return String(this.fullname.length);
            } else {
                return "0";
            }
        },

        // get fullname() {
        //     return `${this.fullname}`;
        // },
    };

    return requestedShiftObject;
}
