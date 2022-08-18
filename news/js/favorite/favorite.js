let configData = JSON.parse(localStorage.getItem("favorite")) || [];

document.addEventListener('click', (e) => {
  const ele = e.target;

  if (ele.classList.contains('favorite-icon')) {
    const id = ele.dataset.id;
    let index = configData.indexOf(id);
    configData.splice(index, 1);
    ele.closest('.article-item').remove();
    localStorage.setItem('favorite', JSON.stringify(configData));
  }
})

function renderActive(id) {
  let str = "";
  const id_category = id + "";
  let configData = JSON.parse(localStorage.getItem("favorite")) || [];
  if (configData.includes(id_category)) {
    str = "active";
  }

  return str;
}
