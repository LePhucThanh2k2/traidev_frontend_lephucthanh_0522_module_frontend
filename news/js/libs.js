function renderDate(date) {
    moment.locale('vi');
    return moment(date).fromNow();
}