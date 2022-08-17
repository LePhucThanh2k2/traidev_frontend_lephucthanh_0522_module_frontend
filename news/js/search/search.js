// CALL FUNCTION
renderMenu();
renderCategories(0, 14);
renderTrendingNews();
renderTags();
renderPopularNews();
getDataWeather();
eleSearch.value = keywordUrl;

// // RENDER FUNCTION
function handleSearch() {
  const keyword = eleSearch.value;
  const link = `search.html?keyword=${keyword}`;
  eleLinkSearch.href = `${link}`;
}

function renderCategories(start, end) {
  getArticles(start, end).then((res) => {
    let htmlFirst = "";
    let htmlLast = "";
    let categoryName = "";
    const data = res.data;
    data.forEach((item, idx) => {
      categoryName = item.category.name;
      if (idx <= 3) {
        htmlFirst += renderFirstCategoryItem(item);
      } else {
        htmlLast += renderLastCategoryItem(item);
      }
    });
    eleMainCategories.innerHTML = renderCategoryItem(
      keywordUrl,
      htmlFirst,
      htmlLast
    );
  });
}
function renderTrendingNews() {
  getArticlesTop(4).then((res) => {
    const data = res.data;
    let htmlTrendingNews = "";
    data.forEach((item) => {
      htmlTrendingNews += renderTrendingNewsItem(item);
    });
    eleTrendingNews.innerHTML = htmlTrendingNews;
  });
}
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

function renderCategoryItem(keyword, first, last) {
  return `
      <div class="col-12">
      <div class="section-title">
          <h4 class="m-0 text-uppercase font-weight-bold">Keyword: ${keyword}</h4>
      </div>
      </div>
      ${first}
      ${last}
      `;
}
function renderFirstCategoryItem(data) {
  return `
  <div class="col-lg-12">
      <div class="row news-lg mx-0 mb-3">
      <div class="col-md-6 h-100 px-0">
          <img class="img-fluid h-100" src="${data.thumb}"
              style="object-fit: cover;">
      </div>
      <div class="col-md-6 d-flex flex-column border bg-white h-100 px-0">
          <div class="mt-auto p-4">
              <div class="mb-2">
                  <a class="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                      href="">${data.category.name}</a>
                  <a class="text-body" href=""><small>${renderDate(
                    data.publish_date
                  )}</small></a>
              </div>
              <a class="h4 d-block mb-3 text-secondary text-uppercase font-weight-bold"
                  href="single.html?id=${data.id}">${highlight(
    data.title,
    keywordUrl
  )}</a>
              <p class="m-0">${highlight(data.description, keywordUrl)}}</p>
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
                  <small class="ml-3 favorite-icon" data-id="${
                    data.id
                  }"><i class="fa-solid fa-heart"></i></small>
              </div>
          </div>
      </div>
      </div>
  </div>
      `;
}
function renderLastCategoryItem(data) {
  return `
    <div class="col-lg-6"> 
      <div class="d-flex align-items-center bg-white mb-3" style="height: 110px;">
      <img class="img-fluid last" src="${data.thumb}" alt="">
      <div
          class="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
          <div class="mb-2">
              <a class="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2"
                  href="">${data.category.name}</a>
              <a class="text-body" href=""><small>${renderDate(
                data.publish_date
              )}</small></a>
          </div>
          <a class="h6 m-0 text-secondary text-uppercase font-weight-bold" href="">${highlight(
            data.title,
            keywordUrl
          )}</a>
      </div>
      </div>
  </div>
      `;
}

function renderTrendingNewsItem(data) {
  return `
      <div class="d-flex align-items-center bg-white mb-3 trending-news" style="height: 110px;">
        <img class="img-fluid img-trending-news" src="${data.thumb}" alt="">
        <div
            class="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
            <div class="mb-2">
                <a class="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2 category"
                    href="">${data.category.name}</a>
                <a class="text-body" href=""><small class="date">${renderDate(
                  data.publish_date
                )}</small></a>
            </div>
            <a class="h6 m-0 text-secondary text-uppercase font-weight-bold title"
                href="">${data.title}</a>
       </div>
    </div>
      `;
}

function renderFoundKeyWord(data, key) {
  const strKey = key.toLowerCase();
  let newName = "";
  const keyWords = new RegExp(strKey, "gim");
  const haveKeyword = data.description.toLowerCase().includes(strKey);
  if (haveKeyword) {
    newName = data.description.replace(keyWords, function (match) {
      return "<mark>" + match + "</mark>";
    });
  }
  return newName;
}

function highlight(str, keyword) {
  if (keyword) {
    const regex = new RegExp(keyword, "gim");
    return str.replace(regex, (match) => "<mark>" + match + "</mark>");
  }
  return str;
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
          <a class="small text-body text-uppercase font-weight-medium title" href="">${
            data.title
          }</a>
      </div>
      `;
}
