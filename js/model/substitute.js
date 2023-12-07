export function construct(originalData) {
    const substituteObject = {
        id: originalData.EmployeeID,
        firstName: originalData.FirstName,
        lastName: originalData.LastName,
        birthdate: originalData.DateOfBirth,
        mail: originalData.Mail,
        number: originalData.Number,
        isAdmin: originalData.IsAdmin,
        userName: originalData.Username,
        passwordHash: originalData.PasswordHash,

        get dateOfBirth() {
            const options = { day: "numeric", month: "short", year: "numeric" };
            const date = new Date(originalData.DateOfBirth);
            return date.toLocaleString("da", options);
        },

        get fullName() {
            return `${this.firstName} ${this.lastName}`;
        },

        get formBirthdate() {
            return this.birthdate.substring(0, 10);
        },
    };
    return substituteObject;
}
