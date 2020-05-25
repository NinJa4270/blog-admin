module.exports = {
    dateFormatUtc(time) {
        var date = new Date(time);
        var year = date.getFullYear();

        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        // 拼接
        return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    },
    dateFormat(row, column, cellValue, index) {
        const daterc = row[column.property];
        if (daterc != null) {
            const dateMat = new Date(
                parseInt(daterc.replace("/Date(", "").replace(")/", ""), 10)
            );
            const year = dateMat.getFullYear();
            const month = dateMat.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
            const day = dateMat.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            const hh = dateMat.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            const mm = dateMat.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            const ss = dateMat.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
            const timeFormat =
                year + "/" + month + "/" + day + " " + hh + ":" + mm + ":" + ss;
            return timeFormat;
        }
    }
}

// dateFormatUtc(time) {
//     var date = new Date(time);
//     var year = date.getFullYear();

//     var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
//     var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
//     var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
//     var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
//     var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
//     // 拼接
//     return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
// },
// dateFormat(row, column, cellValue, index) {
//     const daterc = row[column.property];
//     if (daterc != null) {
//         const dateMat = new Date(
//             parseInt(daterc.replace("/Date(", "").replace(")/", ""), 10)
//         );
//         const year = dateMat.getFullYear();
//         const month = dateMat.getMonth() + 1;
//         const day = dateMat.getDate();
//         const hh = dateMat.getHours();
//         const mm = dateMat.getMinutes();
//         const ss = dateMat.getSeconds();
//         const timeFormat =
//             year + "/" + month + "/" + day + " " + hh + ":" + mm + ":" + ss;
//         return timeFormat;
//     }
// }