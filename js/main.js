"use strict";

// ===== IMPORTS ===== \\
import { initViews } from "./view-router.js";

window.addEventListener("load", initApp);

let loggedInAs = {}

function initApp() {
    console.log("JavaScript is live! 🎉");
    initViews();

}
