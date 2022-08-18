let dataFavorite = JSON.parse(localStorage.getItem("favorite")) || [];
function renderActive(id) {
  let str = "";
  const categoryId = id + "";
  if (dataFavorite.includes(categoryId)) {
    str = "active";
  }
  return str;
}

document.addEventListener("click", (e) => {
  const ele = e.target;
  if (ele.classList.contains("favorite-icon")) {
    const id = ele.dataset.id;
    if (dataFavorite.includes(id)) {
      ele.classList.remove("active");
      const index = dataFavorite.indexOf("1454");
      dataFavorite.splice(index, 1);
    } else {
      ele.classList.add("active");
      dataFavorite.push(id);
    }
    localStorage.setItem("favorite", JSON.stringify(dataFavorite));
  }
});
