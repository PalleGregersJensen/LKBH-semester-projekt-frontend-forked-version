let selectedTab = null;

function initTabs() {
    // setup tab-toggling
    document.querySelectorAll("#tabs-admin h2").forEach((tab) => tab.addEventListener("click", selectTab));
    document.querySelectorAll("#tabs-substitute h2").forEach((tab) => tab.addEventListener("click", selectTab));
    // click the first tab to enable everything
    if (window.location.hash === "#shifts-view-section-admin") {
        document.querySelector("#tabs-admin h2").click();
        console.log("admin shifts table initiated");
    } else if (window.location.hash === "#shifts") {
        document.querySelector("#tabs-substitute h2").click();
        console.log("substitute shifts table initiated");
    }
}

function selectTab(event) {
    const tab = event.target;
    // only accept click, if tab isn't selected
    if (!tab.classList.contains("selected")) {
        // unselect last tab - if any
        if (selectedTab) {
            selectedTab.classList.remove("selected");
            document.querySelector(`#${selectedTab.dataset.tabShow}`).classList.add("hide");
        }
        // select this tab
        tab.classList.add("selected");
        document.querySelector(`#${tab.dataset.tabShow}`).classList.remove("hide");

        // remember the selected tab
        selectedTab = tab;
    }
}

export { initTabs };
