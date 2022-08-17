const eleInputName = document.getElementById("name");
const eleTextArea = document.getElementById("message");
const eleBtnSubmit = document.getElementById("btn-submit");
const eleContainerComment = document.getElementById("container-comment");
const eleMainComment = document.getElementById("main-comment");
let configData = JSON.parse(localStorage.getItem("comment")) || {};
let parent_id = null;
let total_comment = 0;
let id_category = null;

$(document).on("click", "#reply", function (e) {
  const ele = e.target;
  parent_id = ele.dataset.id;
});

eleBtnSubmit.addEventListener("click", () => {
  let arr = configData[id_category] || [];
  let id_comment = arr.length + 1;
  let obj = {};
  obj["id"] = id_comment + "";
  obj["name"] = eleInputName.value;
  obj["message"] = eleTextArea.value;
  obj["date"] = renderDate(moment().format());
  obj["article_id"] = id_category;
  obj["parent_id"] = parent_id;
  arr.push(obj);
  configData[id] = arr;
  localStorage.setItem("comment", JSON.stringify(configData));

  eleInputName.value = "";
  eleTextArea.value = "";
  parent_id = null;
  renderComment(id_category);
});
// FUNCTION
function renderComment(id) {
  id_category = id;
  let html = "";
  const data = JSON.parse(localStorage.getItem("comment"));
  if (data[id_category]) {
    total_comment = data[id_category].length;
    const arr = data[id];
    arr.forEach((item) => {
      const name = item.name;
      const date = item.date;
      const message = item.message;
      const id_item = item.id;
      const parent_id = item.parent_id;
      if (!parent_id) {
        html += renderItemCommentParent(name, date, message, id_item);
      }
      if (parent_id) {
        const mainParent = document.getElementById("main" + parent_id);
        // console.log("prev", mainParent.innerHTML);
        mainParent.innerHTML += renderItemCommentChild(name, date, message);
        // console.log("next", mainParent.innerHTML);
      }
      eleContainerComment.innerHTML = `
      <div class="mb-3" id="container-comment">
        <div class="section-title mb-0">
          <h4 class="m-0 text-uppercase font-weight-bold">${total_comment} Comments</h4>
          </div>
          <div class="bg-white border border-top-0 p-4" id="main-comment">
            ${html}
          </div>
        </div>
      </div>
      `;
    });
  }

  if (!data[id_category]) eleContainerComment.innerHTML = "";
  renderItem(id_category);
}

function renderItemCommentParent(name, date, message, id_item) {
  return ` 
  <div class="media mb-4">
    <img src="img/user.jpg" alt="Image" class="img-fluid mr-3 mt-1" style="width: 45px;">
    <div class="media-body"id="${"main" + id_item}">
        <h6><a class="text-secondary font-weight-bold" href="">${name}</a> <small><i>${date}</i></small></h6>
        <p>${message}</p>
        <label for="name" class="btn btn-sm btn-outline-secondary" "
            id="reply" data-id="${id_item}">Reply</label>
            
    </div>
  </div>
 
  
  `;
}

function renderItemCommentChild(name, date, message) {
  return ` 
  <div class="media">
    <img src="img/user.jpg" alt="Image" class="img-fluid mr-3 mt-1"
        style="width: 45px;">
    <div class="media-body">
        <h6><a class="text-secondary font-weight-bold" href="">${name}</a>
            <small><i>${date}</i></small>
        </h6>
        <p>${message}</p>

    </div>
  </div>
  `;
}
