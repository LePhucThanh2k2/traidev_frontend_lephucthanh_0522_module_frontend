const eleInputName = document.getElementById("name");
const eleTextArea = document.getElementById("message");
const eleBtnSubmit = document.getElementById("btn-submit");
const eleContainerComment = document.getElementById("container-comment");
const eleMainComment = document.getElementById("main-comment");
const eleReplyFor = document.getElementById("reply-for");
let configData = JSON.parse(localStorage.getItem("comment")) || {};
let parentId = null;
let comments = configData[id] || [];
let replyName = "";
renderTotalComments(comments.length);
renderComments(comments);

console.log(comments);

document.addEventListener("click", (e) => {
  const ele = e.target;
  if (ele.classList.contains("btn-reply")) {
    const level = parseInt(ele.dataset.level);
    const commentId = ele.dataset.id;
    parentId = level === 1 ? ele.dataset.id : ele.dataset.parent;
    const parent = comments.find((item) => item.id === commentId);
    replyName = level === 1 ? "" : `@${parent.name} `;
    eleReplyFor.innerHTML = `Trả lời bình luận của <mark>${parent.name} </mark><span class="close-reply" style="cursor: pointer" id="remove-reply-for">X</span>`;
    eleReplyFor.classList.remove("d-none");
  }

  if (ele.id === "remove-reply-for") {
    eleReplyFor.classList.add("d-none");
    parentId = null;
  }

  console.log(parentId);
});

eleBtnSubmit.addEventListener("click", () => {
  let obj = {
    id: makeId(),
    name: eleInputName.value,
    message: replyName + eleTextArea.value,
    date: moment().format(),
    articleId: id,
    parentId: parentId,
  };

  comments.push(obj);
  configData[id] = comments;
  localStorage.setItem("comment", JSON.stringify(configData));

  eleInputName.value = "";
  eleTextArea.value = "";
  parentId = null;
  replyName = "";
  eleReplyFor.classList.add("d-none");
  renderComments(comments);
  renderTotalComments(comments.length);
});
// FUNCTION
function renderComment(item) {
  // const btnReply = item.parentId ? '' : `<label for="name" class="btn btn-sm btn-outline-secondary btn-reply" data-id="${item.id}">Reply</label>`;
  const level = item.parentId ? 2 : 1;
  const btnReply = `<label for="name" class="btn btn-sm btn-outline-secondary btn-reply" data-level="${level}" data-parent="${item.parentId}" data-id="${item.id}">Reply</label>`;
  const className = item.parentId ? "mt-4" : "mb-4";
  return `
  <div class="media ${className}">
    <img src="img/user.jpg" alt="Image" class="img-fluid mr-3 mt-1" id="avatar-comment" style="width: 45px;">
    <div class="media-body" id="comment-item-${item.id}">
      <h6>
        <a class="text-secondary font-weight-bold" href="">${item.name}</a> 
        <small><i>${renderDate(item.date)}</i></small>
      </h6>
      <p>${item.message}</p>
      ${btnReply}
    </div>
  </div>`;
}

function renderTotalComments(total) {
  const comments = document.getElementsByClassName("total-comments");
  for (let index = 0; index < comments.length; index++) {
    comments[index].innerText = total;
  }
}

function renderComments(items) {
  eleMainComment.innerHTML = "";
  items.forEach((item) => {
    if (item.parentId) {
      const itemChild = renderComment(item);
      document.getElementById("comment-item-" + item.parentId).innerHTML +=
        itemChild;
    } else {
      eleMainComment.innerHTML += renderComment(item);
    }
  });
}

// function renderComment(id) {
//   id_category = id;
//   let html = "";
//   const data = JSON.parse(localStorage.getItem("comment"));
//   if (data[id_category]) {
//     total_comment = data[id_category].length;
//     const arr = data[id];
//     arr.forEach((item) => {
//       const name = item.name;
//       const date = item.date;
//       const message = item.message;
//       const id_item = item.id;
//       const parent_id = item.parent_id;
//       if (!parent_id) {
//         html += renderItemCommentParent(name, date, message, id_item);
//       }
//       if (parent_id) {
//         const mainParent = document.getElementById("main" + parent_id);
//         // console.log("prev", mainParent.innerHTML);
//         mainParent.innerHTML += renderItemCommentChild(name, date, message);
//         // console.log("next", mainParent.innerHTML);
//       }
//       eleContainerComment.innerHTML = `
//       <div class="mb-3" id="container-comment">
//         <div class="section-title mb-0">
//           <h4 class="m-0 text-uppercase font-weight-bold">${total_comment} Comments</h4>
//           </div>
//           <div class="bg-white border border-top-0 p-4" id="main-comment">
//             ${html}
//           </div>
//         </div>
//       </div>
//       `;
//     });
//   }

//   if (!data[id_category]) eleContainerComment.innerHTML = "";
//   renderItem(id_category);
// }

function renderItemCommentParent(name, date, message, id_item) {
  return ` 
  <div class="media mb-4">
    <img src="img/user.jpg" alt="Image" class="img-fluid mr-3 mt-1" style="width: 45px;">
    <div class="media-body" id="${"main" + id_item}">
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
