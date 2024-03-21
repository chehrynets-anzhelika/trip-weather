export function isWithin15Days(dateString) {
    const selectedDate = new Date(dateString);
    const currentDate = new Date();
    const diffInMilliseconds = selectedDate - currentDate;
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
    console.log(diffInDays);
    return diffInDays <= 15;
}
