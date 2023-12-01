function createNewSubstituteClicked() {
    console.log("Opret ny vikar klik");
    document.querySelector("#dialog-create-new-substitute").showModal();
};

function createNewSubstitute(event) {
    event.preventDefault();
    console.log("Opret ny vikar");
    const form = event.target;
    console.log(form);
    const firstName = form.firstname.value;
    console.log(firstName);
    const lastName = form.lastname.value;
    console.log(lastName);
    const dateOfBirth = form.elements['date-of-birth'].value;
    console.log(dateOfBirth);
    const mail = form.mail.value;
    console.log(mail);
    const number = form.elements['phone-number'].value;
    console.log(number);
    const adminStatus = form.elements['admin-status'].value;
    console.log(adminStatus);
    const userName = form.username.value;
    console.log(userName);
    const password = form.password.value;
    console.log(password);
}

function closeCreateNewSubstituteDialog() {
    console.log("close create new substitute dialog");
}

export { createNewSubstituteClicked, createNewSubstitute, closeCreateNewSubstituteDialog };