function renderCategories() {
  const data = JSON.parse(localStorage.getItem("favorite")) || [];
  let htmlFirst = "";
  data.forEach((item) => {
    const id = parseInt(item);
    getArticlesById(id).then((res) => {
      const data = res.data;
      htmlFirst += renderFirstCategoryItem(data);
      eleMainCategories.innerHTML = htmlFirst;
    });
  });
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
          <div class="mt-auto p-2">
              <div class="mb-2">
                  <a class="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                      href="">${data.category.name}</a>
                  <a class="text-body" href=""><small>${renderDate(
                    data.publish_date
                  )}</small></a>
              </div>
              <a class="h4 d-block mb-3 text-secondary text-uppercase font-weight-bold"
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
renderCategories();
$(document).on("click", ".favorite-icon", function (e) {
  const ele = e.target;
  let isActive = this.classList.contains("active");
  let id_category = this.dataset.id;
  renderCategories();
});
