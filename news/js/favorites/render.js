renderCategories();
function renderCategories() {
  const data = JSON.parse(localStorage.getItem("favorite")) || [];
  eleMainCategories.innerHTML = `<div class="section-title"style="width:100%;">
  <h4 class="m-0 text-uppercase font-weight-bold">Yêu Thích</h4>
  </div>`;
  data.forEach((item) => {
    const id = parseInt(item);
    getArticlesById(id).then((res) => {
      const data = res.data;
      eleMainCategories.innerHTML += renderFirstCategoryItem(data);
    });
  });
}

function renderFirstCategoryItem(data) {
  return `
  <div class="col-lg-12 article-item">
      <div class="row news-lg mx-0 mb-3">
      <div class="col-md-6 h-100 px-0">
          <img class="img-fluid h-100" src="${data.thumb}"
              style="object-fit: cover;">
      </div>
      <div class="col-md-6 d-flex flex-column border bg-white h-100 px-0">
          <div class="mt-auto p-2">
              <div class="mb-2">
                  <a class="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                      href="">${data.category.name}</a>
                  <a class="text-body" href=""><small>${renderDate(
                    data.publish_date
                  )}</small></a>
              </div>
              <a class="h4 d-block mb-3 text-secondary text-uppercase font-weight-bold" id="title-favorite"
                  href="single.html?id=${data.id}">${data.title}</a>
              <p class="m-0">${data.description}</p>
          </div>
          <div class="d-flex justify-content-between bg-white border-top mt-auto p-4">
              <div class="d-flex align-items-center">
                  <img class="rounded-circle mr-2" src="img/user.jpg" width="25" height="25"
                      alt="">
                  <small>John Doe</small>
              </div>
              <div class="d-flex align-items-center">
                  <small class="ml-3"><i class="far fa-eye mr-2"></i>12345</small>
                  <small class="ml-3"><i class="far fa-comment mr-2"></i>${total_comment_by_id(
                    data.id
                  )}</small>
                  <small class="ml-3 favorite-icon ${renderActive(
                    data.id
                  )}" data-id="${
    data.id
  }"><i class="fa-solid fa-heart"></i></small>
              </div>
          </div>
      </div>
      </div>
  </div>
      `;
}
function renderActive(id) {
  let str = "";
  const categoryId = id + "";
  if (dataLocal.includes(categoryId)) {
    str = "active";
  }
  return str;
}
//
// CALL FUNCTION
renderMenu();
renderTags();
renderPopularNews();
getDataWeather();
// // RENDER FUNCTION

function renderTags() {
  getCategoriesNews().then((res) => {
    let htmlTag = "";
    let htmlCategories = "";
    const data = res.data;
    data.forEach((item) => {
      htmlTag += ` <a href="" class="btn btn-sm btn-outline-secondary m-1">${item.name}</a>`;
      htmlCategories += ` <a href="" class="btn btn-sm btn-secondary m-1">${item.name}</a>`;
    });
    eleTags.innerHTML = htmlTag;
    eleCategories.innerHTML = htmlCategories;
  });
}
function renderPopularNews() {
  getArticlesTop(3).then((res) => {
    const data = res.data;
    let htmlPopular = "";
    data.forEach((item) => {
      htmlPopular += renderPopularItem(item);
    });
    elePopularNews.innerHTML = `
      <h5 class="mb-4 text-white text-uppercase font-weight-bold">Popular News</h5>
      ${htmlPopular}
      `;
  });
}
// RENDER ITEMS

function renderMenu() {
  getCategoriesNews().then((res) => {
    const data = res.data;
    let htmlMenuItems = "";
    let htmlMenuItemsOther = "";
    let htmlMenuFavourite = `<a href="favorite.html" class="nav-item nav-link">Yêu Thích</a>`;
    data.forEach((item, index) => {
      const link = `category.html?id=${item.id}`;
      const name = item.name;
      if (index <= 2) {
        htmlMenuItems += `<a href="${link}" class="nav-item nav-link">${name}</a>`;
      } else {
        htmlMenuItemsOther += `<a href="${link}" class="dropdown-item">${name}</a>`;
      }
    });

    htmlMenuItemsOther = `
      <div class="nav-item dropdown">
        <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">Tin khác</a>
        <div class="dropdown-menu rounded-0 m-0">${htmlMenuItemsOther}</div>
      </div>
      `;

    eleMenu.innerHTML = htmlMenuItems + htmlMenuItemsOther + htmlMenuFavourite;
  });
}

function renderPopularItem(data) {
  return `
    <div class="mb-3 popular">
        <div class="mb-2">
            <a class="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2 category"
                href="">${data.category.name}</a>
            <a class="text-body" href=""><small class="date">${renderDate(
              data.publish_date
            )}</small></a>
        </div>
        <a class="small text-body text-uppercase font-weight-medium title" href="single.html?id=${
          data.id
        }">${data.title}</a>
    </div>
    `;
}
