$(document).ready(function () {
  let tbody = $("tbody");
  let page = 1;
  const LIMIT = 100;
  const total = 733;
  const lastPage =
    total % LIMIT === 0 ? total / LIMIT : Math.floor(total / LIMIT) + 1;
  /*
    page = 1 -> offset 0, limit = 5 -> 0
    page = 2 -> offset 5, limit = 5 -> 1
    page = 3 -> offset 10, limit = 5 -> 2
    offset = (page - 1) * LIMIT
    */
  renderItems(page);
  renderPagination();

  // EVENT
  $(document).on("click", ".btn-prev", function () {
    page -= 1;
    renderPageCurrent();
    renderPagination();
    renderItems(page);
  });

  $(document).on("click", ".btn-next", function () {
    page += 1;
    renderPageCurrent();
    renderPagination();
    renderItems(page);
  });

  //   Function
  function renderPageCurrent() {
    let listItem = document.querySelectorAll(".page");
    listItem[page - 1].classList.add("active");
    if (page === 1) {
      $(".btn-prev").addClass("disabled");
    }
    if (page === lastPage) {
      $(".btn-next").addClass("disabled");
    }
  }

  function renderPagination() {
    let str = "";
    for (let i = 1; i <= lastPage; i++) {
      str += ` <li class="page-item page" data-id ="${i}" ><a class="page-link" href="#">${i}</a></li>
       `;
    }
    $(".pagination").html(
      `<li class="page-item btn-prev "><a class="page-link" href="#">Previous</a></li>
       ${str}
        <li class="page-item btn-next"><a class="page-link" href="#">Next</a></li>`
    );
    renderPageCurrent();
  }
  function renderItems(page = 1) {
    const OFFSET = (page - 1) * LIMIT;
    $.ajax({
      type: "GET",
      url: "http://apiforlearning.zendvn.com/api/articles",
      data: { offset: OFFSET, limit: LIMIT },
      dataType: "json",
      success: function (data) {
        const newData = data
          .map((item) => {
            return `
            <tr>
              <th scope="row ">${item.id}</th>
              <td>${item.title}</td>
            </tr>
            `;
          })
          .join("");
        tbody.html(newData);
      },
    });
  }
});
