// --------------ELEMENT-----------------
const eleMenu = document.getElementById("menu");
const eleMainCategories = document.getElementById("main-category");
const eleTrendingNews = document.getElementById("trending-news");
const eleTags = document.querySelector(".tags");
const elePopularNews = document.querySelector("#popular");
const eleCategories = document.querySelector(".footer-categories");
const eleSearch = document.getElementById("input-search");
const eleBtnSearch = document.getElementById("btn-search");
const eleLinkSearch = document.getElementById("link-search");
let dataLocal = JSON.parse(localStorage.getItem("favorite")) || [];
