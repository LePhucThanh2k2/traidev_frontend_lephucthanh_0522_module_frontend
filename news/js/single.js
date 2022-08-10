const API = axios.create({
  baseURL: "http://apiforlearning.zendvn.com/api/",
});

const queryString = window.location.search;
const searchParams = new URLSearchParams(queryString);
const id = searchParams.get("id");

const eleCategory = document.getElementById("category");
const eleMenu = document.getElementById("menu");
const eleTrendingNews = document.getElementById("trending-news");
const eleTags = document.querySelector(".tags");
const elePopularNews = document.querySelector("#popular");
const eleCategories = document.querySelector(".footer-categories");
const eleLoadMore = document.getElementById("append-latest-news");
const eleSearch = document.getElementById("input-search");
const eleBtnSearch = document.getElementById("btn-search");
const eleLinkSearch = document.getElementById("link-search");
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
renderItem(id);
renderMenu();
renderTrendingNews();
renderTags();
renderPopularNews();
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
function renderDate(date) {
  // years, months, weeks, days, hours, minutes, seconds
  const dateApi = date;
  const dateCurrent = moment().format("YYYY-MM-DD hh:mm:ss");
  const a = moment(dateApi);
  const b = moment(dateCurrent);
  const seconds = b.diff(a, "seconds");
  let result = "";
  if (seconds <= 60) {
    result = result + " giây trước";
  }
  if (seconds > 60) {
    result = b.diff(a, "minutes") + " phút trước";
  }
  if (seconds > 3600) {
    result = b.diff(a, "hours") + " giờ trước";
  }
  if (seconds > 86400) {
    result = b.diff(a, "days") + " ngày trước";
  }
  if (seconds > 604800) {
    result = b.diff(a, "weeks") + " tuần trước";
  }
  if (seconds > 2419200) {
    result = b.diff(a, "months") + " tháng trước";
  }
  if (seconds > 29030400) {
    result = b.diff(a, "years") + " năm trước";
  }
  return result;
}
// RENDER ITEM
function renderItem(id) {
  getArticlesById(id).then((res) => {
    const data = res.data;
    console.log(data);
    let html = `
    <img class="img-fluid w-100" src="${data.thumb}" style="object-fit: cover;">
                        <div class="bg-white border border-top-0 p-4">
                            <div class="mb-3">
                                <a class="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                                    href="">${data.category.name}</a>
                                <a class="text-body" href="">${renderDate(
                                  data.publish_date
                                )}</a>
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
                                <span class="ml-3"><i class="far fa-comment mr-2"></i>123</span>
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
// ASYNC FUNCTION
async function getArticlesById(id) {
  return await API.get(`articles/${id}`);
}
async function getCategoriesNews(offset = 0, limit = 15) {
  return await API.get("categories_news", {
    params: {
      offset: offset,
      limit: limit,
    },
  });
}
async function getArticlesTop(limit = 10) {
  return await API.get("articles/top-articles", {
    params: {
      limit: limit,
    },
  });
}
