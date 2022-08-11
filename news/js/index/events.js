// --------------------EVENT-------------------------
eleLoadMore.addEventListener("click", () => {
    eleLoadMore.innerHTML = 'Đang tải <i class="fa fa-spinner fa-spin" aria-hidden="true"></i>';
    loadMoreLatestNews(latestNewsIdx);
    latestNewsIdx += 4;
});

eleBtnSearch.addEventListener("click", () => {
    handleSearch();
});

eleSearch.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Trigger the button element with a click
        eleBtnSearch.click();
    }
});