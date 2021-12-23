function clock() {
    let date = new Date(),
        days = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate(),
        hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours(),
        minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes(),
        seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
    document.getElementById("date").innerText = days + '.' + date.getMonth() + '.' + date.getFullYear();
    document.getElementById("clock").innerText = hours + ':' + minutes + ':' + seconds;
}
setTimeout(clock,0);
setInterval(clock, 9000);