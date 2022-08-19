// --------------------EVENT-------------------------
eleLoadMore.addEventListener("click", () => {
  eleLoadMore.innerHTML =
    'Đang tải <i class="fa fa-spinner fa-spin" aria-hidden="true"></i>';
  loadMoreLatestNews(latestNewsIdx);
  latestNewsIdx += 4;
});
