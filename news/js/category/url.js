const queryString = window.location.search;
const searchParams = new URLSearchParams(queryString);
const id = parseInt(searchParams.get("id"));
if (!Boolean(id)) window.location.href = 'index.html';
