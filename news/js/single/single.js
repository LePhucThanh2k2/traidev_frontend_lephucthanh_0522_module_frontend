renderItem(id);
renderMenu();
renderTrendingNews();
renderTags();
renderPopularNews();
getDataWeather();
// RENDER FUNCTION
function handleSearch() {
  const keyword = eleSearch.value;
  const link = `search.html?keyword=${keyword}`;
  eleLinkSearch.href = `${link}`;
}
function renderMenu() {
  getCategoriesNews().then((res) => {
    const data = res.data;
    let htmlMenuItems = "";
    let htmlMenuItemsOther = "";
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

    eleMenu.innerHTML = htmlMenuItems + htmlMenuItemsOther;
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
      htmlTag += ` <a href="category.html?id=${item.id}" class="btn btn-sm btn-outline-secondary m-1">${item.name}</a>`;
      htmlCategories += ` <a href="category.html?id=${item.id}" class="btn btn-sm btn-secondary m-1">${item.name}</a>`;
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

// RENDER ITEM
function renderItem(id) {
  getArticlesById(id).then((res) => {
    const data = res.data;
    let html = `
    <img class="img-fluid w-100" src="${data.thumb}" style="object-fit: cover;">
                        <div class="bg-white border border-top-0 p-4">
                            <div class="mb-3">
                                <a class="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                                    href="">${data.category.name}</a>
                                <span class="text-body" href="">${renderDate(
                                  data.publish_date
                                )}</span>
                            </div>
                            <h1 class="mb-3 text-secondary text-uppercase font-weight-bold">${
                              data.title
                            }</h1>
                            <p>${data.content}</p>
                        </div>
                        <div class="d-flex justify-content-between bg-white border border-top-0 p-4">
                            <div class="d-flex align-items-center">
                                <img class="rounded-circle mr-2" src="img/user.jpg" width="25" height="25" alt="">
                                <span>John Doe</span>
                            </div>
                            <div class="d-flex align-items-center">
                                <span class="ml-3"><i class="far fa-eye mr-2"></i>12345</span>
                                <span class="ml-3"><i class="far fa-comment mr-2"></i>${total_comment_by_id(
                                  data.id
                                )}</span>
                            </div>
                        </div>
    `;
    eleCategory.innerHTML = html;
  });
}

function renderTrendingNewsItem(data) {
  return `
  <div class="d-flex align-items-center bg-white mb-3 trending-news" style="height: 110px;">
      <img class="img-fluid img-trending-news" src="${data.thumb}" alt="">
      <div
          class="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
          <div class="mb-2" id="flex-col">
              <a class="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2 category"
                  href="">${data.category.name}</a>
              <span class="text-body" href=""><small class="date">${renderDate(
                data.publish_date
              )}</small></span>
          </div>
          <a class="h6 m-0 text-secondary text-uppercase font-weight-bold title" id="title-trending-news"
              href="single.html?id=${data.id}">${data.title}</a>
     </div>
  </div>
    `;
}
function renderPopularItem(data) {
  return `
    <div class="mb-3 popular">
        <div class="mb-2">
            <a class="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2 category"
                href="">${data.category.name}</a>
            <span class="text-body" href=""><small class="date">${renderDate(
              data.publish_date
            )}</small></span>
        </div>
        <a class="small text-body text-uppercase font-weight-medium title" href="single.html?id=${
          data.id
        }">${data.title}</a>
    </div>
    `;
}
