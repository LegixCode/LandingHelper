const dtime_nums = `function dtime_nums(offset) {
    const date = new Date()
    date.setDate(date.getDate() + offset)
    let day = date.getDate().toString().padStart(2, 0);
    let month = (date.getMonth() + 1).toString().padStart(2,0);
    document.write({format});
}`;

export function getDTimeNums(format) {
    var _format = "";
    switch (format) {
        case "DD.MM.YYYY":
            _format = "day + '.' + month + '.' + date.getFullYear()";
            break;
        case "DD/MM/YYYY":
            _format = "day + '/' + month + '/' + date.getFullYear()";
            break;
        case "DD-MM-YYYY":
            _format = "day + '-' + month + '-' + date.getFullYear()";
            break;
        case "YYYY-MM-DD":
            _format = "date.getFullYear() + '-' + month + '-' + day";
            break;
        case "MM-DD-YYYY":
            _format = "month + '-' + day + '-' + date.getFullYear()";
            break;
        case "MM/DD/YYYY":
            _format = "month + '/' + day + '/' + date.getFullYear()";
            break;
    }
    return dtime_nums.replace("{format}", _format);
}
