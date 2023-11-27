"use strict";

// ===== IMPORTS ===== \\
import { initViews } from "./view-router.js";

window.addEventListener("load", initApp);

function initApp() {
    console.log("JavaScript is live! 🎉");
    initViews();
}
