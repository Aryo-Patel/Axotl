export default function getDateRange(date1, date2) {
    let x = new Date();
    x.setTime(Date.parse(date1))
    let y = new Date();
    y.setTime(Date.parse(date2));
    return x.toDateString().substr(4) + "-" + y.toDateString().substr(4);
}