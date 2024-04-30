import { isWithin14Days } from "./checkDate";

export function validateInputs(city, startDate, endDate) {
    if (!city.city && startDate && endDate) return "Please enter a city.";
    if (!city.city || !startDate || !endDate) return "Please field all input.";
    if (city.city && startDate === endDate) return "Start date mustn't be end date.";
    if (city.city && new Date(startDate) > new Date(endDate)) return "The start date must not be less than the end date.";
    if (!isWithin14Days(startDate)) return "The start date must be within the next 14 days including this day.";
    if (!isWithin14Days(endDate)) return "The end date must be within the next 14 days including this day.";
    return null;
}