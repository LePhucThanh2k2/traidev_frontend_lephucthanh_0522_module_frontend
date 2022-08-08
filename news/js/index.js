const API = axios.create({
  baseURL: "http://apiforlearning.zendvn.com/api/",
});
const navItemList = document.querySelectorAll("a.nav-item");
const dropdownToggle = document.querySelector(".dropdown-toggle");
dropdownToggle.textContent = "Tin Khác";
const dropdownMenu = document.querySelector(".dropdown-menu");
const categoriesActive = document.querySelector(".nav-item.active");
let idCategory = null;
// Main news
const categoryMainNews = document.querySelectorAll(".main-news .category");
const dateMainNews = document.querySelectorAll(".main-news .date");
const titleMainNews = document.querySelectorAll(".main-news .title");
// Featured news
const categoryFeaturedNews = document.querySelectorAll(
  ".feature-news .category"
);
const dateFeaturedNews = document.querySelectorAll(".feature-news .date");
const titleFeaturedNews = document.querySelectorAll(".feature-news .title");
// Latest news primary
const categoryLatestNewsPrimary = document.querySelectorAll(
  ".latest-news-primary .category"
);
const dateLatestNewsPrimary = document.querySelectorAll(
  ".latest-news-primary .date"
);
const titleLatestNewsPrimary = document.querySelectorAll(
  ".latest-news-primary .title"
);
const descLatestNewsPrimary = document.querySelectorAll(
  ".latest-news-primary .desc"
);
// Latest news secondary
const categoryLatestNewsSecondary = document.querySelectorAll(
  ".latest-news-secondary .category"
);
const dateLatestNewsSecondary = document.querySelectorAll(
  ".latest-news-secondary .date"
);
const titleLatestNewsSecondary = document.querySelectorAll(
  ".latest-news-secondary .title"
);
// Latest news third
const categoryLatestNewsThird = document.querySelectorAll(
  ".latest-news-third .category"
);
const dateLatestNewsThird = document.querySelectorAll(
  ".latest-news-third .date"
);
const titleLatestNewsThird = document.querySelectorAll(
  ".latest-news-third .title"
);
// trending news
const categoryTrendingThird = document.querySelectorAll(
  ".trending-news .category"
);
const dateTrendingThird = document.querySelectorAll(".trending-news .date");
const titleTrendingThird = document.querySelectorAll(".trending-news .title");
// Tags
const eleTags = document.querySelector(".tags");
// categories
const eleCategories = document.querySelector(".footer-categories");
// Popular
const categoryPopular = document.querySelectorAll(".popular .category");
const datePopular = document.querySelectorAll(".popular .date");
const titlePopular = document.querySelectorAll(".popular .title");

// ------------------------------------

async function getCategoriesNews(offset = 0, limit = 15) {
  let items = null;
  await API.get("categories_news", {
    params: {
      offset: offset,
      limit: limit,
    },
  }).then((res) => {
    items = res.data;
  });
  return items;
}

async function getArticlesById(offset = 0, limit = 64, id) {
  let items = null;
  await API.get(`categories_news/${id}/articles`, {
    params: {
      offset: offset,
      limit: limit,
    },
  }).then((res) => {
    items = res.data;
  });
  return items;
}

getCategoriesNews()
  .then((res) => {
    let dropdownItems = "";
    let strTagName = "";
    let strCategories = "";
    for (const key in res) {
      const categories = res[key].name;
      strTagName += ` <a href="" class="btn btn-sm btn-outline-secondary m-1">${categories}</a>`;
      strCategories += ` <a href="" class="btn btn-sm btn-secondary m-1">${categories}</a>`;
    }
    for (const key in res) {
      const item = res[key];
      if (key < navItemList.length) {
        navItemList[key].textContent = item.name;
        navItemList[key].dataset.id = item.id;
      } else {
        dropdownItems += ` <a href="#" class="dropdown-item" data-id="${item.id}">${item.name}</a>`;
      }
    }
    eleTags.innerHTML = strTagName;
    eleCategories.innerHTML = strCategories;
    dropdownMenu.innerHTML = dropdownItems;
    idCategory = categoriesActive.dataset.id;
    return getArticlesById(0, 15, idCategory);
  })
  .then((res) => {
    // Main News
    for (let i = 0; i < categoryMainNews.length; i++) {
      const category = categoryMainNews[i];
      const date = dateMainNews[i];
      const title = titleMainNews[i];
      category.textContent = res[i].category.name;
      date.textContent = res[i].publish_date;
      title.textContent = res[i].title;
    }
    return getArticlesById(15, 15, idCategory);
  })
  .then((res) => {
    // Featured News
    for (let i = 0; i < categoryFeaturedNews.length; i++) {
      const category = categoryFeaturedNews[i];
      const date = dateFeaturedNews[i];
      const title = titleFeaturedNews[i];
      category.textContent = res[i].category.name;
      date.textContent = res[i].publish_date;
      title.textContent = res[i].title;
    }
    return getArticlesById(30, 15, idCategory);
  })
  .then((res) => {
    // last news primary
    for (let i = 0; i < categoryLatestNewsPrimary.length; i++) {
      const category = categoryLatestNewsPrimary[i];
      const date = dateLatestNewsPrimary[i];
      const title = titleLatestNewsPrimary[i];
      const desc = descLatestNewsPrimary[i];
      category.textContent = res[i].category.name;
      date.textContent = res[i].publish_date;
      title.textContent = res[i].title;
      desc.textContent = res[i].description;
    }
    return getArticlesById(45, 15, idCategory);
  })
  .then((res) => {
    // last news secondary
    for (let i = 0; i < categoryLatestNewsSecondary.length; i++) {
      const category = categoryLatestNewsSecondary[i];
      const date = dateLatestNewsSecondary[i];
      const title = titleLatestNewsSecondary[i];
      category.textContent = res[i].category.name;
      date.textContent = res[i].publish_date;
      title.textContent = res[i].title;
    }

    return getArticlesById(55, 15, idCategory);
  })
  .then((res) => {
    // last news third
    for (let i = 0; i < categoryLatestNewsThird.length; i++) {
      const category = categoryLatestNewsThird[i];
      const date = dateLatestNewsThird[i];
      const title = titleLatestNewsThird[i];
      category.textContent = res[i].category.name;
      date.textContent = res[i].publish_date;
      title.textContent = res[i].title;
    }
    return getArticlesById(5, 5, idCategory);
  })
  .then((res) => {
    // trending news
    for (let i = 0; i < categoryTrendingThird.length; i++) {
      const category = categoryTrendingThird[i];
      const date = dateTrendingThird[i];
      const title = titleTrendingThird[i];
      category.textContent = res[i].category.name;
      date.textContent = res[i].publish_date;
      title.textContent = res[i].title;
    }
    return getArticlesById(20, 3, idCategory);
  })
  .then((res) => {
    // popular
    for (let i = 0; i < categoryPopular.length; i++) {
      const category = categoryPopular[i];
      const date = datePopular[i];
      const title = titlePopular[i];
      category.textContent = res[i].category.name;
      date.textContent = res[i].publish_date;
      title.textContent = res[i].title;
    }
  });
