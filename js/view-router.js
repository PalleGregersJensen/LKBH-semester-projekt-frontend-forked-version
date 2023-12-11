import { initTabs } from "./tabs.js";
import { loginAsAdmin, loginAsSubstitute } from "./main.js";

function initViews() {
    // Add hashchange event listener only once during initialization
    window.addEventListener("hashchange", viewChange);
    document.querySelector("#logout-btn").classList.add("hide");

    // Call viewChange function on initialization
    viewChange();
}

function viewChange() {
    // Get the current hashLink
    let hashLink = location.hash || "#login-page";

    // get currentUser from localStorage if any
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser && !currentUser.loggedIn) {
        if (currentUser.IsAdmin) {
            currentUser.loggedIn = true;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));

            // hashLink = "#admin-page";
            // location.hash = hashLink;
            location.hash = "#mypage-admin";
            document.querySelector(".view-content-admin").classList.add("active");

            document.querySelector("#logout-btn").classList.remove("hide");
            setLoggedInAs(currentUser);
        } else if (!currentUser.IsAdmin && !currentUser.loggedIn) {
            currentUser.loggedIn = true;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));

            // hashLink = "#substitute-page";
            // location.hash = hashLink;
            location.hash = "#mypage";

            document.querySelector("#logout-btn").classList.remove("hide");

            setLoggedInAs(currentUser);
            substituteViewMypage(location.hash);
        }
    } else if (location.hash === "#mypage") {
        substituteViewMypage(hashLink);
        setLoggedInAs(currentUser);
    } else if (location.hash === "#shifts") {
        substituteViewShifts(hashLink);
        setLoggedInAs(currentUser);
    } else if (location.hash === "#schema") {
        substituteViewSchema(hashLink);
        setLoggedInAs(currentUser);
    } else if (location.hash === "#mypage-admin") {
        adminViewMypage(hashLink);
        setLoggedInAs(currentUser);
    } else if (location.hash === "#shifts-view-section-admin") {
        initTabs();
        adminViewShifts(hashLink);
        setLoggedInAs(currentUser);
    } else if (location.hash === "#substitutes-view-section-admin") {
        adminViewSubstitutes(hashLink);
        setLoggedInAs(currentUser);
    }
    // Hide all views
    hideAllViews();

    // Display the active one
    // const activeView = document.querySelector(hashLink);
    if (hashLink) {
        document.querySelector(hashLink).classList.add("active");
    }

    // // Update the hash link in case it was modified
    // if (window.location.hash !== hashLink) {
    //     window.location.hash = hashLink;
    // }

    // if (hashLink === "#shifts-view-section-admin" || hashLink === "#shifts") {
    //     initTabs();
    // }
}

function setLoggedInAs(currentUser) {
    document.querySelector("#username-logged-in").textContent = `Du er logget ind som ${currentUser.Username}`;
}

function adminViewMypage(hashLink) {
    document.querySelector(hashLink).classList.add("active");
    document.querySelector(".view-content-admin").classList.add("active");
    document.querySelector(".view-content-substitute").classList.remove("active");
    document.querySelector("#logout-btn").classList.remove("hide");
    loginAsAdmin();
}

function adminViewShifts(hashLink) {
    document.querySelector(hashLink).classList.add("active");
    document.querySelector(".view-content-admin").classList.add("active");
    document.querySelector(".view-content-substitute").classList.remove("active");
    document.querySelector("#logout-btn").classList.remove("hide");
    loginAsAdmin();
    // initTabs();
}
function adminViewSubstitutes(hashLink) {
    document.querySelector(hashLink).classList.add("active");
    document.querySelector(".view-content-admin").classList.add("active");
    document.querySelector(".view-content-substitute").classList.remove("active");
    document.querySelector("#logout-btn").classList.remove("hide");
    loginAsAdmin();
}

function substituteViewMypage(hashLink) {
    document.querySelector(hashLink).classList.add("active");
    document.querySelector(".view-content-substitute").classList.add("active");
    document.querySelector("#logout-btn").classList.remove("hide");
    // console.log("læses dette");
    loginAsSubstitute();
}

function substituteViewShifts(hashLink) {
    initTabs();
    document.querySelector(hashLink).classList.add("active");
    document.querySelector(".view-content-substitute").classList.add("active");
    document.querySelector("#logout-btn").classList.remove("hide");
    loginAsSubstitute();
}

function substituteViewSchema(hashLink) {
    document.querySelector(hashLink).classList.add("active");
    document.querySelector(".view-content-substitute").classList.add("active");
    document.querySelector("#logout-btn").classList.remove("hide");
    loginAsSubstitute();
}

// function setActiveLink(view) {
//     //sætter link variabel til at være det samme som hashLink/location.hash, altså den URL man er på
//     const link = document.querySelector(`a.view-link[href="${view}"]`);

//     //sætter link/den side man er på til at være aktiv
//     if (link) {
//         link.classList.add("active");
//     }
// }

function hideAllViews() {
    document.querySelectorAll(".view-content").forEach((link) => link.classList.remove("active"));
    //document.querySelectorAll(".view-link").forEach((link) => link.classList.add("active"));
}

function logOutView() {
    console.log("logging out");

    let hashLink = "#login-page";

    hideAllViews();
    document.querySelector(hashLink).classList.add("active");
    document.querySelector("#login-form").reset();
    document.querySelector("#logout-btn").classList.add("hide");
    document.querySelector("#username-logged-in").textContent = "";
    document.querySelector(".view-content-substitute").classList.remove("active");
    document.querySelector(".view-content-admin").classList.remove("active");
    // setActiveLink(hashLink);
    location.hash = hashLink;
    localStorage.clear();
    document.querySelector("#admin-user-info").innerHTML = "";
    document.querySelector("#shifts-admin-tbody").innerHTML = "";
    document.querySelector("#availableShifts-admin-tbody").innerHTML = "";
    document.querySelector("#substitutes-list-admin-tbody").innerHTML = "";
    document.querySelector(".my-info").innerHTML = "";
    document.querySelector("#myShifts").innerHTML = "";
    document.querySelector("#availableShifts").innerHTML = "";
}

export { initViews, viewChange, logOutView };
