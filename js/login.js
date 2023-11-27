import { endpoint, initApp } from "./main.js";

// login clicked
async function loginClicked() {
    console.log("login clicked");
    const form = event.target;
    const userName = form.username.value;
    console.log(userName);
    const password = form.password.value;
    console.log(password);
    const checkedUsernnameAndPassword = await checkUsernameAndPassword(userName, password);
    console.log(checkedUsernnameAndPassword);
}

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
        // if success, run start
        return response;
    } else {
        console.log("Login fejlede");
    }
}

export { loginClicked };
