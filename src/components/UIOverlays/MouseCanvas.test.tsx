import { act, render, screen } from "@testing-library/react";
import { MouseCanvas } from "./MouseCanvas";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureStore([]);


describe("MouseCanvas", () => {
    let store : any = mockStore({});
    it("renders the canvas element", async () => {
        await act( async () => render(
            <Provider store={store}>
                <MouseCanvas />
            </Provider>));
        const canvas = screen.getByRole("canvas", { hidden: true });
        expect(canvas).toBeInTheDocument();
    });

    it("sets the canvas dimensions to match the window size", async () => {
        await act( async () => render(
            <Provider store={store}>
                <MouseCanvas />
            </Provider>));
        const canvas = screen.getByRole("canvas");
        expect(canvas).toHaveAttribute("width", window.innerWidth.toString());
        expect(canvas).toHaveAttribute("height", window.innerHeight.toString());
    });
});