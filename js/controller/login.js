import { endpoint } from "../main.js";
import { viewChange } from "./view-router.js";

// Handle login info and if user is confirmed store user in localStorage
async function login(event) {
    event.preventDefault();

    const form = event.target;

    const userName = form.username.value;
    const password = form.password.value;

    const user = await checkUsernameAndPassword(userName, password);

    if (user) {
        const confirmedUser = user.employee;

        localStorage.setItem("currentUser", JSON.stringify(confirmedUser));

        viewChange();
    }
}

// Post response to backend to see, if entered username and password is correct
async function checkUsernameAndPassword(enteredUserName, enteredPassword) {
    try {
        const userNameAndPassword = { userName: enteredUserName, password: enteredPassword };
        const userNameAndPasswordAsJSON = JSON.stringify(userNameAndPassword);

        const response = await fetch(`${endpoint}/login`, {
            method: "POST",
            headers: { "content-Type": "application/json" },
            body: userNameAndPasswordAsJSON,
        });

        if (response.ok) {
            const data = response.json();
            return data;
        } else {
            console.log("Login fejlede");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

export { login };
