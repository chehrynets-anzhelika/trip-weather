import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from "../Header/Header";
import * as hooks from "react-redux";


jest.mock("react-redux");
const mockedDispatch = jest.spyOn(hooks, "useDispatch");


test("Schould render component Header", () => {
    mockedDispatch.mockReturnValue(jest.fn());
    render(<Header />);
    expect(screen.getByTestId("header")).toMatchSnapshot();
})