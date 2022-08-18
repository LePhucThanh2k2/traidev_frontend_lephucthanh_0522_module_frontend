// EVENT
eleBtnSearch.addEventListener("click", () => {
  handleSearch();
});
eleSearch.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Trigger the button element with a click
    eleBtnSearch.click();
  }
});
document.addEventListener("click", (e) => {
  let data = JSON.parse(localStorage.getItem("favorite")) || [];
  const ele = e.target;

  if (ele.classList.contains("favorite-icon")) {
    const id = ele.dataset.id;
    let index = data.indexOf(id);
    data.splice(index, 1);
    localStorage.setItem("favorite", JSON.stringify(data));
    ele.closest(".article-item").remove();
  }
});
