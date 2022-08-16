// -------------------------------------------------
renderMenu();
renderTopNews();
renderFeatureNews();
renderLatestNews(0, 12);
renderTrendingNews();
renderTags();
renderPopularNews();
getDataWeather();
// ------------------------------------

// RENDER FUNCTION
function handleSearch() {
  const keyword = eleSearch.value.trim();
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

function renderTopNews() {
  getArticlesTop(7).then((res) => {
    const data = res.data;
    let htmlTopMenuLeft = "";
    let htmlTopMenuRight = "";
    data.forEach((item, idx) => {
      if (idx <= 2) {
        htmlTopMenuLeft += renderTopNewsItem(item, 500);
      } else {
        htmlTopMenuRight += `<div class="col-md-6 px-0"> ${renderTopNewsItem(
          item,
          250,
          "w-100"
        )} </div>`;
      }
    });
    eleTopMenuLeft.innerHTML = htmlTopMenuLeft;
    eleTopMenuRight.innerHTML = htmlTopMenuRight;
    $(".main-carousel").owlCarousel({
      autoplay: true,
      smartSpeed: 1500,
      items: 1,
      dots: true,
      loop: true,
      center: true,
    });
  });
}

function renderFeatureNews() {
  getArticlesTop(7).then((res) => {
    const data = res.data;
    let htmlFeatureNews = "";
    data.forEach((item) => {
      htmlFeatureNews += renderFeatureNewsItem(item);
    });
    eleFeatureNews.innerHTML = htmlFeatureNews;
    $(".carousel-item-4").owlCarousel({
      autoplay: true,
      smartSpeed: 1000,
      margin: 30,
      dots: false,
      loop: true,
      nav: true,
      navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        576: {
          items: 1,
        },
        768: {
          items: 2,
        },
        992: {
          items: 3,
        },
        1200: {
          items: 4,
        },
      },
    });
  });
}

function renderLatestNews(offset, limit) {
  getArticles(offset, limit).then((res) => {
    const data = res.data;
    let htmlPrimary = "";
    let htmlSecondary = "";
    let htmlThird = "";
    data.forEach((item, idx) => {
      if (idx <= 1) {
        htmlPrimary += `<div class="col-lg-6">${renderLatestNewsPrimaryItem(
          item
        )}</div>`;
      } else if (idx <= 3) {
        htmlSecondary += `<div class="col-lg-6">${renderLatestNewsPrimaryItem(
          item,
          true
        )}</div>`;
      } else {
        htmlThird += renderLatestNewsThirdItem(item);
      }
    });
    eleLatestNews.innerHTML = `
    <div class="col-12">
      <div class="section-title">
        <h4 class="m-0 text-uppercase font-weight-bold">Latest News</h4>
        <a class="text-secondary font-weight-medium text-decoration-none" href="">View All</a>
      </div>
    </div>
    ${htmlPrimary} ${htmlSecondary} ${htmlThird}`;
  });
}

function loadMoreLatestNews(offset) {
  getArticles(offset, 4).then((res) => {
    if (res.data) {
      let content = "";
      res.data.forEach((item) => {
        content += renderLatestNewsThirdItem(item);
      });
      eleLatestNews.innerHTML += content;
      eleLoadMore.innerText = "Xem thêm";
    } else {
      eleLoadMore.remove();
    }
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

// RENDER ITEMS
function renderTopNewsItem(data, height = 200, classAttrImg = "") {
  return `
  <div class="position-relative overflow-hidden main-news" style="height: ${height}px;">
    <img class="img-fluid ${classAttrImg} h-100" src="${
    data.thumb
  }" style="object-fit: cover;">
    <div class="overlay">
      <div class="mb-2 ">
        <a class="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2 category" href="category.html?id=${
          data.category_id
        }">${data.category.name}</a>
        <a class="text-white" href="#">
        <small class="date">${renderDate(data.publish_date)}</small></a>
      </div>
      <a class="h6 m-0 text-white text-uppercase font-weight-semi-bold title" href="single.html?id=${
        data.id
      }">${data.title}</a>
    </div>
  </div>`;
}

function renderFeatureNewsItem(data) {
  return ` 
  <div class="position-relative overflow-hidden feature-news" style="height: 300px;">
   <img class="img-fluid h-100" src="${data.thumb}" style="object-fit: cover;">
   <div class="overlay">
       <div class="mb-2">
           <a class="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2 category"
               href="">${data.category.name}</a>
           <a class="text-white" href=""><small class="date">${renderDate(
             data.publish_date
           )}</small></a>
       </div>
       <a class="h6 m-0 text-white text-uppercase font-weight-semi-bold title" href="single.html?id=${
         data.id
       }">${data.title}</a>
   </div>
</div>`;
}

function renderLatestNewsPrimaryItem(data, isShowDesc = true) {
  const desc = isShowDesc
    ? `<p class="m-0 desc" id="desc">${data.description}</p>`
    : "";
  return /* html */ `
    <div class="position-relative mb-3">
      <img class="img-fluid w-100" src="${
        data.thumb
      }" style="object-fit: cover;">
      <div class="bg-white border border-top-0 p-4">
        <div class="mb-2">
          <a class="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2 category"
              href="">${data.category.name}</a>
          <a class="text-body" href=""><small class="date">${renderDate(
            data.publish_date
          )}</small></a>
        </div>
        <a class="h4 d-block mb-3 text-secondary text-uppercase font-weight-bold title"id="title"
            href="single.html?id=${data.id}">${data.title}</a>
        ${desc}
      </div>
      <div class="d-flex justify-content-between bg-white border border-top-0 p-4">
        <div class="d-flex align-items-center">
          <img class="rounded-circle mr-2" src="img/user.jpg" width="25" height="25"
              alt="">
          <small class="author">John Doe</small>
        </div>
        <div class="d-flex align-items-center">
          <small class="ml-3"><i class="far fa-eye mr-2"></i>12345</small>
          <small class="ml-3"><i class="far fa-comment mr-2"></i>${total_comment_by_id(
            data.id
          )}</small>
        </div>
      </div>
    </div>`;
}

function renderLatestNewsThirdItem(data) {
  return `
  <div class="col-lg-6 latest-news-third">
    <div class="d-flex align-items-center bg-white mb-3" style="height: 110px;">
      <img class="img-fluid img-latestNews-third" src="${data.thumb}" alt="">
      <div class="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
        <div class="mb-2">
          <a class="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2 category"
              href="">${data.category.name}</a>
          <a class="text-body" href=""><small class="date">${renderDate(
            data.publish_date
          )}</small></a>
        </div>
        <a class="h6 m-0 text-secondary text-uppercase font-weight-bold title" href="single.html?id=${
          data.id
        }">${data.title}</a>
      </div>
    </div>
  </div>`;
}
function renderTrendingNewsItem(data) {
  return `
  <div class="d-flex align-items-center bg-white mb-3 trending-news" style="height: 110px;">
    <img class="img-fluid img-trending-news" src="${data.thumb}" alt="">
    <div
        class="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
        <div class="mb-2"id="flex-col">
            <a class="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2 category"
                href="">${data.category.name}</a>
            <a class="text-body" href=""><small class="date">${renderDate(
              data.publish_date
            )}</small></a>
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
