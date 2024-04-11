export function formattedDate(date) {
    let newDate = new Date(date);
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    if(day < 10) day = '0' + day;
    if(month < 10) month = '0' + month;

    let formattedDate = year + '-' + month + '-' + day;
    return formattedDate;

}