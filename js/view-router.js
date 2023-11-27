function initViews() {
  window.addEventListener("hashchange", viewChange);
  viewChange();
}

function viewChange() {
  let hashLink = "#mypage"; // default view

  if (location.hash) {
      hashLink = location.hash;
  }

  hideAllViews();
  document.querySelector(hashLink).classList.add("active");
  setActiveLink(hashLink);
}

function setActiveLink(view) {
  const link = document.querySelector(`a.view-link[href="${view}"]`);
  if (link) {
      link.classList.add("active");
  }
}

function hideAllViews() {
  document.querySelectorAll(".view-content").forEach((view) => view.classList.remove("active"));
  document.querySelectorAll(".view-link").forEach((link) => link.classList.remove("active"));
}

export {initViews};