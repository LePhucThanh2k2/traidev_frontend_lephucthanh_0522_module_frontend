function renderDate(date) {
  moment.locale("vi");
  return moment(date).fromNow();
}

function makeId(length = 12) {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function haveFavorite(content) {
  Toastify({
    text: content,
    newWindow: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      borderRadius: "25px",
      border: "2px #000 solid",
      color: "#fff",
      background: "green",
    },
  }).showToast();
}
function unFavorite(content) {
  Toastify({
    text: content,
    newWindow: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      borderRadius: "25px",
      border: "2px #000 solid",
      color: "#fff",
      background: "red",
    },
  }).showToast();
}
