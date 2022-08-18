const queryString = window.location.search;
const searchParams = new URLSearchParams(queryString);
const id = parseInt(searchParams.get("id"));
