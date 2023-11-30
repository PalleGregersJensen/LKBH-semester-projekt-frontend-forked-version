// login.js

import { endpoint } from "./main.js";
import { viewChange } from "./view-router.js";

let isLoggedIn = false;
let isAdmin = false;
let employee = null;

// Check if there is a saved login status and employee data in localStorage
const storedLoginStatus = localStorage.getItem("isLoggedIn");
const storedEmployee = localStorage.getItem("employee");

// Restore login status and employee data if available
if (storedLoginStatus && storedEmployee) {
    isLoggedIn = JSON.parse(storedLoginStatus);
    employee = JSON.parse(storedEmployee);
}

// login clicked
async function loginClicked() {
    const form = event.target;
    const userName = form.username.value;
    const password = form.password.value;

    let employeeData = await checkUsernameAndPassword(userName, password);
    employee = employeeData.employee;

    if (employeeData.success) {
        isLoggedIn = true;
        document.querySelector("#logout-btn").classList.remove("hidden");

        // Save login status and employee data to localStorage
        localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
        localStorage.setItem("employee", JSON.stringify(employee));

        if (Number(employee.IsAdmin) === 1) {
            isAdmin = true;
        } else {
            isAdmin = false;
        }

        setLoginUsername();
        viewChange(employee);
    } else {
        console.log("Login failed");
    }

    return employee;
}

// Post response to the backend to see if the entered username and password are correct
async function checkUsernameAndPassword(enteredUserName, enteredPassword) {
    try {
        const userNameAndPassword = { userName: enteredUserName, password: enteredPassword };
        const userNameAndPasswordAsJSON = JSON.stringify(userNameAndPassword);

        const response = await fetch(`${endpoint}/login`, {
            method: "POST",
            body: userNameAndPasswordAsJSON,
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            isLoggedIn = true;
            document.querySelector("#logout-btn").classList.remove("hidden");

            const data = await response.json();
            // console.log(data);
            return data;
        } else {
            console.log("Login failed");
            return { success: false };
        }
    } catch (error) {
        console.error("An error occurred:", error);
        return { success: false };
    }
}

function setLoginUsername() {
    document.querySelector("#username-logged-in").textContent = `Du er logget ind som ${employee.Username}`;
}

export { loginClicked};
