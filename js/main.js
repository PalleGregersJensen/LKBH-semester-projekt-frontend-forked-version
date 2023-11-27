import { loginClicked } from "./login.js";

const endpoint = "http://localhost:3333";

("use strict");

window.addEventListener("load", initApp);

function initApp() {
    console.log("JavaScript is live! 🎉");
    document.querySelector("#logout-btn").classList.add("hidden");
    document.querySelector("#login-form").addEventListener("submit", loginClicked);
}

export { endpoint, initApp };
