import { isWithin14Days } from "../checkDate";

const farthestDay = new Date().getDate() + 13; 
const farthestIncorrectDay = new Date().getDate() + 30;
const nearestIncorrectDay = new Date().getDate() + 14;
const nearestDay = new Date().getDate() + 1;
const middleDay = new Date().getDate() + 6;
const year = new Date().getFullYear();
const month = new Date().getMonth();

const getTestData = (day) => {
    return new Date(year, month, day)
}

describe('Correct value', () => {
    test("Schould return true with farthest value", () => {
        expect(isWithin14Days(getTestData(farthestDay))).toBe(true);
    });
    test("Schould return true with nearest value", () => {
        expect(isWithin14Days(getTestData(nearestDay))).toBe(true);
    });
    test("Schould return true with middle value", () => {
        expect(isWithin14Days(getTestData(middleDay))).toBe(true);
    });
});

describe('Incorrect value', () => {
    test("Schould return false value with incorrect farthest value", () => {
        expect(isWithin14Days(getTestData(farthestIncorrectDay))).toBe(false);
    });
    test("Schould return false value with incorrect nearest value", () => {
        expect(isWithin14Days(getTestData(nearestIncorrectDay))).toBe(false);
    })
});
