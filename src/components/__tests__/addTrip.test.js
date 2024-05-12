import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddTrip from "../AddTrip/AddTrip";
import * as hooks from "react-redux";
import * as actions from "../../store/modalSlice";

jest.mock("react-redux");
const mockedDispatch = jest.spyOn(hooks, "useDispatch");

describe('Component AddTrip', () => {
    test("schould create component", () => {
        mockedDispatch.mockReturnValue(jest.fn());
        const component = render(<AddTrip/>);
        expect(component).toMatchSnapshot(); 
    });

    test("schould dispatch actions", () => {
        const dispatch = jest.fn();
        mockedDispatch.mockReturnValue(dispatch);
        const mockedOpenModal = jest.spyOn(actions, "openModal");
        render(<AddTrip/>);
        const button = screen.getByTestId("button");
        fireEvent.click(button);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(mockedOpenModal).toHaveBeenCalledTimes(1);
    } )
});



