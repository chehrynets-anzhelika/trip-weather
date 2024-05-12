import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NextButton from "../NextButton/NextButton";


describe('Component NextButton', () => {
    const mockClick = jest.fn();
    test("schould render a component", () => {
        render(<NextButton
            className="next-button"
            position="left"
            direction="leftBtn"
            onClick={mockClick}
        />);
        expect(screen.getByRole("button")).toBeInTheDocument();
    });
    test("should click on a button", () => {
        render(<NextButton onClick={mockClick} />);
        fireEvent.click(screen.getByRole("button"));
        expect(mockClick).toHaveBeenCalledTimes(1);
    });
    test("schould have the correct class buttonLeft", () => {
        render(<NextButton position={"left"}  direction="leftBtn"/>);
        expect(screen.getByRole("button")).toHaveClass("buttonLeft");
    });
    test("schould have the correct class buttonRight", () => {
        render(<NextButton position={"right"}  direction="rightBtn"/>);
        expect(screen.getByRole("button")).toHaveClass("buttonRight");
    });
});
