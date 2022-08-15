async function getArticlesById(id) {
  return await API.get(`articles/${id}`);
}
async function getCategoriesNews(offset = 0, limit = 15) {
  return await API.get("categories_news", {
    params: {
      offset: offset,
      limit: limit,
    },
  });
}
async function getArticlesTop(limit = 10) {
  return await API.get("articles/top-articles", {
    params: {
      limit: limit,
    },
  });
}
