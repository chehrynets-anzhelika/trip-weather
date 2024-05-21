import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TripItem from "../TripItem/TripItem";
import * as hooks from "react-redux";
import userEvent from '@testing-library/user-event';
import * as actions from "../../store/dataSlice";

const mockTripItemData1 = {
    id: "123",
    selected: false,
    cityImage: "http://test/123.jpg",
    cityName: "London",
    city: "London",
    startDate: "2024-05-25",
    endDate: "2024-05-30",
}

const mockTripItemData2 = {
    id: "111",
    selected: true,
    cityImage: "http://test/111.jpg",
    cityName: "Kyiv",
    city: "Kyiv",
    startDate: "2024-05-25",
    endDate: "2024-05-30",
}

const mockRedux = {
    data: { trips: [{
        city: {
            city: "Kyiv",
            country: "Ukraine",
            id: "111",
        } ,
        cityImage: "http://test/111.jpg",
        startDate: "2024-05-25",
        endDate: "2024-05-30",
        selected: true,   
    }], 
},
googleUser: {id: null}
}

jest.mock("react-redux");
const mockedDispatch = jest.fn();

beforeEach(() => {
    jest.spyOn(hooks, 'useDispatch').mockReturnValue(mockedDispatch);
    jest.spyOn(hooks, "useSelector").mockImplementation(() => jest.fn());
  })

describe('TripItem', () => {
    test("TripItem render with data", () => {
        render(<TripItem {...mockTripItemData1}/>);
        expect(screen.getByTestId("card")).toBeInTheDocument();
        expect(screen.getByText(/London/)).toBeInTheDocument();
    });
    test("TripItem should clicked", () => {
        hooks.useSelector.mockImplementation((selector) => selector(mockRedux));
        render(<TripItem {...mockTripItemData2}/>);
        userEvent.click(screen.getByTestId("card"));
        expect(screen.getByTestId("card")).toHaveClass("checked");
    })
    test("TripItem should render loading state", () => {
        render(<TripItem {...mockTripItemData1} cityImage={null}/>);
        expect(screen.getByTestId("loader")).toBeInTheDocument();
    });
    test("TripItem should render image", () => {
        render(<TripItem {...mockTripItemData1}/>);
        expect(screen.getByRole("img")).toHaveAttribute("src", mockTripItemData1.cityImage);
    });
    test("TripItem should render city name", () => {
        render(<TripItem {...mockTripItemData1}/>);
        expect(screen.getByText(mockTripItemData1.cityName)).toBeInTheDocument();
    });
    test("TripItem should render dates", () => {
        render(<TripItem {...mockTripItemData1}/>);
        const dates = `${mockTripItemData1.startDate} - ${mockTripItemData1.endDate}`;
        expect(screen.getByText(dates)).toBeInTheDocument();
    });
    test("TripItem should call deleteCard on delete icon click", () => {
        hooks.useSelector.mockImplementation((selector) => selector(mockRedux));
        const mockedOpenModal = jest.spyOn(actions, "deleteCard");
        render(<TripItem {...mockTripItemData1}/>);
        userEvent.click(screen.getByTestId("delete"));
        expect(mockedOpenModal).toHaveBeenCalledTimes(1);
    });
    
});
