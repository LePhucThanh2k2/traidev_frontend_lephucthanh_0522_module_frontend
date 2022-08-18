const queryString = window.location.search;
const searchParams = new URLSearchParams(queryString);
const id = searchParams.get("id");
