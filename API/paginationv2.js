$(document).ready(function () {
  let i = 0;
  let tbody = $("tbody");
  let page = 1;
  let firstIdx = 1;
  let lastIdx = 4;
  const LIMIT = 100;
  const total = 733;
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

    console.log('lastIdx', lastIdx);
    console.log('i', i);

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
    for (let i = firstIdx; i <= lastIdx; i++) {
      const classActive = i === page ? 'active' : '';
      str += ` <li class="page-item page ${classActive}" data-id ="${i}" ><a class="page-link" href="#">${i}</a></li>
       `;
    }
    $(".pagination").html(
      `<li class="page-item btn-prev "><a class="page-link" href="#">Previous</a></li>
       ${str}
        <li class="page-item btn-next"><a class="page-link" href="#">Next</a></li>`
    );
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
