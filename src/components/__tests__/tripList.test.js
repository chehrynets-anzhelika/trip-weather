import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TripList from "../TripList/TripList";
import * as hooks from "react-redux";

jest.mock("react-redux");
const mockedDispatch = jest.fn();
const data = [{
    city: {
        city: "London",
        country: "United Kindom",
        id: "123",
    } ,
    cityImage: "http://test/123.jpg",
    startDate: "2024-05-25",
    endDate: "2024-05-30",
    selected: false,   
}]

const mockDataForEmpty = {
            data: { trips: [], filteredTrips: [] },
            search: { searchValue: '' },
            sort: { sortValue: ""},
            googleUser: {id: null}
        }

beforeEach(() => {
    jest.spyOn(hooks, 'useDispatch').mockReturnValue(mockedDispatch);
    jest.spyOn(hooks, "useSelector").mockImplementation(() => jest.fn());
  })

describe('TripList', () => {
    test("List renders without data", () => {
        hooks.useSelector.mockImplementation((selector) => selector(mockDataForEmpty));
       render(<TripList />);
       expect(screen.getByTestId("triplist")).toBeInTheDocument();
       expect(screen.getByText('You haven’t created any trips yet')).toBeInTheDocument();
    });

    test("List renders with data", () => {
       hooks.useSelector.mockReturnValue(data);
       render(<TripList />);
       expect(screen.getByTestId("triplist")).toBeInTheDocument();
    });
});
