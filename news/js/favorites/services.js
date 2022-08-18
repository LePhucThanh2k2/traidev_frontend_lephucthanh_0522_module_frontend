// ASYNC FUNCTION
async function getArticlesById(id) {
  return await API.get(`articles/${id}`);
}
