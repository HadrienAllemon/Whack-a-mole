import { act, render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { ScreenShaker } from "./ScreenShaker";
import { shakeScreen } from "../../store/gameSlice/gameSlice";

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

  it("triggers shake when shaking is true", async () => {
    store = mockStore({
      game: {
        shaking: true,
      },
    });
    const dispatchSpy = vi.spyOn(store, "dispatch");
    await act( async () => render(
      <Provider store={store}>
        <ScreenShaker>
          <div>Test Child</div>
        </ScreenShaker>
      </Provider>
    ));
    vi.advanceTimersByTime(1000);
    expect(dispatchSpy).toHaveBeenCalledWith(shakeScreen(false));;
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