let configData = JSON.parse(localStorage.getItem("favorite")) || [];
$(document).on("click", ".favorite-icon", function (e) {
  const ele = e.target;
  let isActive = this.classList.contains("active");
  let id_category = this.dataset.id;
  if (isActive) {
    let index = configData.indexOf(id_category + "");
    configData.splice(index, 1);
    this.classList.remove("active");
    localStorage.setItem("favorite", JSON.stringify(configData));
  } else {
    configData.push(id_category);
    this.classList.add("active");
    localStorage.setItem("favorite", JSON.stringify(configData));
  }
});

function renderActive(id) {
  let str = "";
  const id_category = id + "";
  let configData = JSON.parse(localStorage.getItem("favorite")) || [];
  if (configData.includes(id_category)) {
    str = "active";
  }

  return str;
}
