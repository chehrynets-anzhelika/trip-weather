import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sort from "../Sort/Sort";
import HeaderButton from '../HeaderButton/HeaderButton';
import * as hooks from "react-redux";

jest.mock("react-redux");
const mockedDispatch = jest.spyOn(hooks, "useDispatch");
const mockItems = [
    {"data-name": "1", value: "test1"}, 
    {"data-name": "2", value: "test2"}
];

describe("Sort", () => {
  mockedDispatch.mockReturnValue(jest.fn());
  test("Components renders", () => {
       render(<Sort />)
       expect(screen.getByTestId("sort")).toBeInTheDocument();
  });
  test("Components renders with data", () => {
    render(<HeaderButton items={mockItems}/>);
    expect(screen.getByText(/test1/i)).toBeInTheDocument();
  });
});