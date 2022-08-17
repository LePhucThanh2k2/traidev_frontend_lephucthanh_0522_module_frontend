function total_comment_by_id(id_category) {
  let data = JSON.parse(localStorage.getItem("comment")) || {};
  let result = 0;
  if (data[parseInt(id_category)]) {
    result = data[parseInt(id_category)].length;
  }
  return result;
}
