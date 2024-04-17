import { formattedDate } from "./formattedDate";

export const checkCopiesCards = (cards, newSity, newStartDate, newEndDate) => {
    let duplicate = cards.some(({ city, startDate, endDate }) => city.city === newSity.city && city.country === newSity.country && formattedDate(startDate) === newStartDate && formattedDate(endDate) === newEndDate);
    return duplicate;
}