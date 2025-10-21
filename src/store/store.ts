import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice/gameSlice";
import pageReducer from "./pageSlice/pageSlice";
export const store = configureStore({
    reducer: {
        game: gameReducer,
        pageTracker:pageReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;