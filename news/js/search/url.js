const queryString = window.location.search;
const searchParams = new URLSearchParams(queryString);
const keywordUrl = searchParams.get("keyword");
