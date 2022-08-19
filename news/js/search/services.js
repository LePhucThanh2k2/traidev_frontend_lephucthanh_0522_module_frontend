async function getArticles(offset = 0, limit = 14) {
  return await API.get(`articles/search?q=${keywordUrl}`, {
    params: {
      offset: offset,
      limit: limit,
    },
  });
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