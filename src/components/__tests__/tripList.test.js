import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TripList from "../TripList/TripList";
import * as hooks from "react-redux";

jest.mock("react-redux");
const mockedSelector = jest.spyOn(hooks, "useSelector");

describe('TripList', () => {
    test("List renders", () => {
       mockedSelector.mockReturnValue([]);
       render(<TripList />);
       expect(screen.getByTestId("triplist")).toBeInTheDocument();
    });

    
});
