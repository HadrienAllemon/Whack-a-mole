import { act, render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { ScreenShaker } from "./ScreenShaker";

const mockStore = configureStore([]);

vi.useFakeTimers();


describe("ScreenShaker", () => {
  let store: any;


  it("renders children correctly", () => {
    store = mockStore({
      game: {
        shaking: true,
      },
    });
    const { getByText } = render(
      <Provider store={store}>
        <ScreenShaker>
          <div>Test Child</div>
        </ScreenShaker>
      </Provider>
    );

    expect(getByText("Test Child")).toBeInTheDocument();
  });

 

  it("does not trigger shake when shaking is false", async () => {
    store = mockStore({
      game: {
        shaking: false,
      },
    });
    await act( async () => render(
      <Provider store={store}>
        <ScreenShaker>
          <div>Test Child</div>
        </ScreenShaker>
      </Provider>
    ));
    const dispatchSpy = vi.spyOn(store, "dispatch");
    expect(dispatchSpy).not.toHaveBeenCalled();;
  });
});