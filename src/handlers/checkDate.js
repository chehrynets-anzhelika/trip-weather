export function isWithin14Days(dateString) {
    const selectedDate = new Date(dateString);
    const currentDate = new Date();
    const diffInMilliseconds = selectedDate - currentDate;
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
    return diffInDays <= 13;
}
