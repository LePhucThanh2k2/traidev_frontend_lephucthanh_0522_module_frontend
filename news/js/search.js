const API = axios.create({
  baseURL: "http://apiforlearning.zendvn.com/api/",
});

const queryString = window.location.search;
const searchParams = new URLSearchParams(queryString);
const keyword = searchParams.get("keyword");
// --------------ELEMENT-----------------
const eleMenu = document.getElementById("menu");
const eleMainCategories = document.getElementById("main-category");
const eleTrendingNews = document.getElementById("trending-news");
const eleTags = document.querySelector(".tags");
const elePopularNews = document.querySelector("#popular");
const eleCategories = document.querySelector(".footer-categories");
const eleSearch = document.getElementById("input-search");
const eleBtnSearch = document.getElementById("btn-search");
const eleLinkSearch = document.getElementById("link-search");
// CALL FUNCTION
renderMenu();
renderCategories();
renderTrendingNews();
renderTags();
renderPopularNews();
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
      keyword,
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
                  href="">${data.title}</a>
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
                  <small class="ml-3"><i class="far fa-comment mr-2"></i>123</small>
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
          <a class="h6 m-0 text-secondary text-uppercase font-weight-bold" href="">${
            data.title
          }</a>
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
// ASYNC FUNCTION
async function getArticles(offset = 0, limit = 14) {
  return await API.get(`articles/search?q=${keyword}`, {
    params: {
      offset: offset,
      limit: limit,
    },
  });
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
// -------------------------------------------------------------------------------------------------------------------------------------
let i = 0;
let page = 1;
let firstIdx = 1;
let lastIdx = 4;
const LIMIT = 14;
const total = 64;
const TOTAL_PAGINATION = 3; // lastIdx - 1 | 0 1 2 3
const lastPage =
  total % LIMIT === 0 ? total / LIMIT : Math.floor(total / LIMIT) + 1;
/*
      page = 1 -> offset 0, limit = 5 -> 0
      page = 2 -> offset 5, limit = 5 -> 1
      page = 3 -> offset 10, limit = 5 -> 2
      offset = (page - 1) * LIMIT
  
      renderPagination 1-4
                       2-5
      */
renderItems(page);

getArticles().then((res) => {
  const data = res.data;
  if (data.length > 0) {
    renderPagination(firstIdx, lastIdx);
  }
});

// EVENT
$(document).on("click", ".btn-prev", function () {
  if (i !== 0) {
    i -= 1;
  } else {
    firstIdx -= 1;
    lastIdx -= 1;
  }

  page -= 1;
  if (page === 0) {
    $(".btn-prev").addClass("disabled");
  }
  renderPagination(firstIdx, lastIdx);
  renderItems(page);
});

$(document).on("click", ".btn-next", function () {
  if (lastIdx === lastPage) {
    i += 1;
  } else {
    firstIdx += 1;
    lastIdx += 1;
  }
  page += 1;
  renderPagination(firstIdx, lastIdx);
  renderItems(page);
  if (i === TOTAL_PAGINATION) {
    $(".btn-next").addClass("disabled");
  }
});

//   Function

function renderPagination(firstIdx, lastIdx) {
  let str = "";
  const classDisabled = page === 1 ? "disabled" : "";
  for (let i = firstIdx; i <= lastIdx; i++) {
    const classActive = i === page ? "active" : "";
    str += ` <li class="page-item page ${classActive}" data-id ="${i}" ><a class="page-link" href="#">${i}</a></li>
         `;
  }
  $(".pagination").html(
    `<li class="page-item btn-prev ${classDisabled} "><a class="page-link" href="#">Previous</a></li>
         ${str}
          <li class="page-item btn-next"><a class="page-link" href="#">Next</a></li>`
  );
}
function renderItems(page = 1) {
  const OFFSET = (page - 1) * LIMIT;
  renderCategories(OFFSET, 14);
}
