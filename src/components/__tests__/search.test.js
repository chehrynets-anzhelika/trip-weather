import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from "../Search/Search";
import * as hooks from "react-redux";
import userEvent from '@testing-library/user-event';

jest.mock("react-redux");
const mockedDispatch = jest.fn();

beforeEach(() => {
  jest.spyOn(hooks, 'useDispatch').mockReturnValue(mockedDispatch);
  jest.spyOn(hooks, "useSelector").mockImplementation(() => jest.fn());
})

describe('Search', () => {
    test("Search renders", () => {
      render(<Search />);
      expect(screen.getByTestId("search")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Search your trip")).toBeInTheDocument();
    });
    test('Typing in Search works', () => {
      render(<Search />);
      hooks.useSelector.mockReturnValue("React");
      expect(screen.queryByDisplayValue(/React/)).toBeNull();
      userEvent.type(screen.getByTestId("input"), "React");
      expect(screen.queryByDisplayValue(/React/)).toBeInTheDocument();
    });
    test('Clear in Search works', () => {
      render(<Search />);
      hooks.useSelector.mockReturnValue("React");
      userEvent.clear(screen.getByTestId("input"));
      expect(screen.getByTestId("input")).toHaveValue("");
    });
    test('Change in Search works', () => {
      render(<Search />);
      userEvent.type(screen.getByTestId("input"), "R");
      fireEvent.change(screen.getByTestId("input"));
      expect(mockedDispatch).toHaveBeenCalledTimes(5);
    });
    test('Icon in Search has opacity', () => {
      render(<Search />);
      expect(screen.getByTestId("icon")).toHaveClass("opacity");
      userEvent.type(screen.getByTestId("input"), "R");
      expect(screen.getByTestId("icon")).toHaveClass("notopacity");
    });
});
