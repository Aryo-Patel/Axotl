export default function compareDates(date1, date2) {
    // let time2 = date2.getTime();
    // seconds of difference
    let diff = Math.abs(Date.parse(date2) - date1) / 1000 / 60;

    // if the difference in minutes is less than 60, return the number of minutes ago
    if (diff < 60) return `${Math.ceil(diff)} minutes ago`

    // convert to hours of difference
    diff = diff / 60;
    if (diff < 24) return `${Math.ceil(diff)} hours ago`

    //convert to days of difference
    diff = diff / 24
    if (diff < 7) return `${Math.ceil(diff)} days ago`

    //convert to weeks of difference
    diff = diff / 7
    if (diff < 4) return `${Math.ceil(diff)} weeks ago`

    //convert to days of difference
    diff = diff / 52 * 12
    if (diff < 12) return `${Math.ceil(diff)} months ago`

    diff = diff / 12
    return `${Math.ceil(diff)} years ago`
};