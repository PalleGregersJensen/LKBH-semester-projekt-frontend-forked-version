////test
const user = {
    name: "admin1",
    password: "123",
    isAdmin: true,
};
////test

function initViews() {
    //window lytter på et hashchange og kalder viewChange hvis hash ændres
    window.addEventListener("hashchange", viewChange);

    //kalder viewChange ved opstart
    viewChange();
}

function viewChange() {
    //sætter hashlink til #login-page som default
    let hashLink = "#login-page";

    //hvis location.hash er noget så sættes hashlink til det
    if (location.hash) {
        hashLink = location.hash;
    }

    //fjerner "active" fra alle elementer
    hideAllViews();

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
    document.querySelectorAll(".view-content").forEach((link) => link.classList.remove("active"));
    document.querySelectorAll(".view-link").forEach((link) => link.classList.remove("active"));
}

export { initViews };
