import { endpoint, initApp } from "./main.js";
import { viewChange } from "./view-router.js";

let isLoggedIn;
// console.log(isLoggedIn);
let isAdmin;
// console.log(isAdmin);
// employee is the object of the employee logged in
let employee;

// login clicked
async function loginClicked() {
    // console.log("login clicked");
    const form = event.target;
    const userName = form.username.value;
    // console.log(userName);
    const password = form.password.value;
    // console.log(password);
    let employeeData = await checkUsernameAndPassword(userName, password);
    employee = employeeData.employee;
    // console.log(employee);
    // console.log(employee.IsAdmin);
    // Checks if user logged in is admin or substitute
    if (Number(employee.IsAdmin) === 1) {
        isAdmin = true;
    } else {
        isAdmin = false;
    }
    // console.log(isAdmin);
    setLoginUsername();

    viewChange(employee);
    return employee
}

// Post response to backend to see, if entered username and password is correct
async function checkUsernameAndPassword(enteredUserName, enteredPassword) {
    try {
        // console.log("check username and password");
        // console.log(enteredUserName);
        // console.log(enteredPassword);
        const userNameAndPassword = { userName: enteredUserName, password: enteredPassword };
        const userNameAndPasswordAsJSON = JSON.stringify(userNameAndPassword);
        // console.log(userNameAndPasswordAsJSON);
        const response = await fetch(`${endpoint}/login`, {
            method: "POST",
            body: userNameAndPasswordAsJSON,
            headers: {
                "content-Type": "application/json",
            },
        });

        if (response.ok) {
            // if response ok, set isLoggedIn = true and return JSON data
            isLoggedIn = true;
            // console.log(isLoggedIn);
            document.querySelector("#logout-btn").classList.remove("hidden");
            // retrieve JSON-data from backend and returns it
            const data = await response.json();
            // console.log(data);
            return data;
        } else {
            console.log("Login fejlede");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

function setLoginUsername() {
    // console.log(employee);
    document.querySelector("#username-logged-in").textContent = `Du er logget ind som ${employee.Username}`;
}

export { loginClicked};
