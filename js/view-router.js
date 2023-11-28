function initViews() {
    //window lytter på et hashchange og kalder viewChange hvis hash ændres
    // window.addEventListener("hashchange", viewChange);
    document.querySelector("#login-form").addEventListener("submit", setUser);
    document.querySelector("#logout-btn").addEventListener("click", logOut);

    //kalder viewChange ved opstart
    viewChange();
}

function setUser(event) {
    const form = event.target;
    // console.log(form);
    const user = {
        username: form.username.value, // username should be checked with database
        password: form.password.value, // password should be checked with database
        isAdmin: true, // retrieve admin status from database....???
    };

    viewChange(user);
}

function viewChange(user) {
    //sætter hashlink til #login-page som default
    let hashLink = "#login-page";
    // console.log(user);

    //hvis location.hash er noget så sættes hashlink til det
    if (!user) {
        hashLink = hashLink;
        console.log("user is not...");
    } else if (user.isAdmin) {
        hashLink = "#admin-page";
        console.log(`user is: ${user.username} (Admin: ${user.isAdmin})`);
        document.querySelector("#logout-btn").classList.add("active");
    } else if (!user.isAdmin) {
        hashLink = "#substitute-page";
        console.log(`user is: ${user.username} (Admin: ${user.isAdmin})`);
        document.querySelector("#logout-btn").classList.add("active");
    }

    //fjerner "active" fra alle elementer
    hideAllViews();

    console.log(hashLink)
    //tilføjer "active" til det hashLink man er på
    document.querySelector(hashLink).classList.add("active");
    setActiveLink(hashLink);
}

function setActiveLink(view) {
    //sætter link variabel til at være det samme som hashLink/location.hash, altså den URL man er på
    const link = document.querySelector(`a.view-link[href="${view}"]`);

    //sætter link/den side man er på til at være aktiv
    if (link) {
        link.classList.add("active");
    }
}

function hideAllViews() {
    document.querySelectorAll(".view-content:not(#logout-btn)").forEach((link) => link.classList.remove("active"));
    // document.querySelectorAll(".view-link").forEach((link) => link.classList.remove("active"));
}

function logOut() {
    let hashLink = "#login-page";

    hideAllViews();
    document.querySelector(hashLink).classList.add("active");
    document.querySelector("#login-form").reset();
    document.querySelector("#logout-btn").classList.remove("active");
    setActiveLink(hashLink);
}

export { initViews };
