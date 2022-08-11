// ASYNC FUNCTION
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

async function getArticles(offset = 0, limit = 12) {
    return await API.get(`articles`, {
        params: {
            offset: offset,
            limit: limit,
        },
    });
}