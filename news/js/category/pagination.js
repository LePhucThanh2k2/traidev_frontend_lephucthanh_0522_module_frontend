// -------------------------------------------------------------------------------------------------------------------------------------
$(document).ready(function () {
  const elePageItemList = document.querySelectorAll(".page");
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
  renderPagination(firstIdx, lastIdx);

  // EVENT
  $(document).on("click", ".btn-prev", function () {
    if (i !== 0) {
      i -= 1;
    } else {
      firstIdx -= 1;
      lastIdx -= 1;
    }
    page -= 1;
    handlerUrl(page);

    if (page === 1) {
      $(".btn-prev").addClass("disabled");
    }
    renderPagination(firstIdx, lastIdx);
    renderItems(page);
  });

  $(document).on("click", ".page", function (e) {
    const ele = e.target;

    page = parseInt(ele.innerText);
    handlerUrl(page);

    if (page === 1) {
      $(".btn-prev").addClass("disabled");
    }
    // Need debug
    if (page === lastPage) {
      console.log("zo");
      $(".btn-next").addClass("disabled");
    }
    i = page - 1;

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
    handlerUrl(page);
    renderPagination(firstIdx, lastIdx);
    renderItems(page);
    if (page === lastPage) {
      $(".btn-next").addClass("disabled");
    }
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
