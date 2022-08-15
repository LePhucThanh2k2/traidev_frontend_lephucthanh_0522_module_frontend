// -------------------------------------------------------------------------------------------------------------------------------------
$(document).ready(function () {
  const elePageItemList = document.querySelectorAll(".page");
  let page = 1;
  const LIMIT = 14;
  const total = 64;
  const pageRange = 4;
  const lastPage = total % LIMIT === 0 ? total / LIMIT : Math.floor(total / LIMIT) + 1;
  /*
      page = 1 -> offset 0, limit = 5 -> 0
      page = 2 -> offset 5, limit = 5 -> 1
      page = 3 -> offset 10, limit = 5 -> 2
      offset = (page - 1) * LIMIT
  
      renderPagination 1-4
                       2-5
      */
  renderItems(page);
  renderPaginationNew();

  // EVENT
  $(document).on("click", ".page", function (e) {
    const ele = e.target;
    page = parseInt(ele.innerText);
    handlerUrl(page);

    if (page === 1) $(".btn-prev").addClass("disabled");
    if (page === lastPage) $(".btn-next").addClass("disabled");
    renderPaginationNew();
    renderItems(page);
  });

  $(document).on("click", ".btn-next", function () {
    page += 1;
    handlerUrl(page);
    renderPaginationNew();
    renderItems(page);
    if (page === lastPage) $(".btn-next").addClass("disabled");
  });

  $(document).on("click", ".btn-prev", function () {
    page -= 1;
    handlerUrl(page);
    renderPaginationNew();
    renderItems(page);
    if (page === 1) $(".btn-prev").addClass("disabled");
  });

  //   Function
  function renderPagination(firstIdx, lastIdx) {
    let str = "";
    const classDisabled = page === 1 ? "disabled" : "";
    for (let idx = firstIdx; idx <= lastIdx; idx++) {
      const classActive = idx === page ? "active" : "";
      str += ` <li class="page-item page ${classActive}" data-id ="${idx}" ><a class="page-link">${idx}</a></li>
         `;
    }
    $(".pagination").html(
      `<li class="page-item btn-prev ${classDisabled} "><a class="page-link" >Previous</a></li>
         ${str}
          <li class="page-item btn-next"><a class="page-link">Next</a></li>`
    );
  }

  function renderPaginationNew() {
    let str = "";
    const classDisabledPrev = page === 1 ? "disabled" : "";
    const classDisabledNext = page === lastPage ? "disabled" : "";
    let end = page + pageRange - 1;
    if (end > lastPage) end = lastPage;
    start = end - pageRange + 1;

    if (page === start && page !== 1) {
      end--;
      start--;
    }

    for (let i = start; i <= end; i++) {
      const classActive = i === page ? "active" : "";
      str += `<li class="page-item page ${classActive}" data-id="${i}"><a class="page-link">${i}</a></li>`;
    }

    $(".pagination").html(`
      <li class="page-item btn-prev ${classDisabledPrev}"><a class="page-link" >Previous</a></li>
        ${str}
      <li class="page-item btn-next ${classDisabledNext}"><a class="page-link">Next</a></li>`);
  }

  function renderItems(page = 1) {
    const OFFSET = (page - 1) * LIMIT;
    renderCategories(OFFSET, 14);
  }
  function handlerUrl(idx) {
    const url = new URL(window.location);
    url.searchParams.set("page", idx);
    window.history.pushState({}, "", url);
  }
});
