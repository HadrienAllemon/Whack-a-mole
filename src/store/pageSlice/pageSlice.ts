import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
type pages = "home" | "game" 
interface PageState {
    currentPage: pages;
    displayHighScores: boolean;
}

const initialState: PageState = {
    currentPage: 'home',
    displayHighScores: false
};

const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setPage(state, action: PayloadAction<pages>) {
            state.currentPage = action.payload;
        },
        toggleHighScores(state) {
            state.displayHighScores = !state.displayHighScores;
        }
    },
});

export const { setPage, toggleHighScores } = pageSlice.actions;

export default pageSlice.reducer;