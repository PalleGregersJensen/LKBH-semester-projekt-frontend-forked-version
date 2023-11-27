import { endpoint, initApp } from "./main.js";

let isLoggedIn;
console.log(isLoggedIn);
let isAdmin;
console.log(isAdmin);

// login clicked
async function loginClicked() {
    console.log("login clicked");
    const form = event.target;
    const userName = form.username.value;
    console.log(userName);
    const password = form.password.value;
    console.log(password);
    const checkedUsernameAndPassword = await checkUsernameAndPassword(userName, password);
    console.log(checkedUsernameAndPassword.isAdmin);
    // Checks if user logged in is admin or substitute
    if (checkedUsernameAndPassword.isAdmin === 1) {
        isAdmin = true;
    } else {
        isAdmin = false;
    }
    console.log(isAdmin);
}

// Post response to backend to see, if entered username and password is correct
async function checkUsernameAndPassword(enteredUserName, enteredPassword) {
    console.log("check username and password");
    console.log(enteredUserName);
    console.log(enteredPassword);
    const userNameAndPassword = { userName: enteredUserName, password: enteredPassword };
    const userNameAndPasswordAsJSON = JSON.stringify(userNameAndPassword);
    console.log(userNameAndPasswordAsJSON);
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
        console.log(isLoggedIn);
        // retrieve JSON-data from backend
        const data = await response.json();
        console.log(data);
        return data;
    } else {
        console.log("Login fejlede");
    }
}

export { loginClicked };
