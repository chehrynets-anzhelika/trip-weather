import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from "../Search/Search";
import * as hooks from "react-redux";

jest.mock("react-redux");
const mockedDispatch = jest.fn();
jest.spyOn(hooks, "useDispatch").mockReturnValue(mockedDispatch);
describe('Search', () => {
    test("Search renders", () => {
      render(<Search />);
      expect(screen.getByTestId("search")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Search your trip")).toBeInTheDocument();
    });
});
