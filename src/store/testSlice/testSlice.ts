import { createSlice } from "@reduxjs/toolkit"

interface CounterState {
    value:number
}

const initialState: CounterState = {
    value: 0
}

const testSlice = createSlice({
    name: "test",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        reset: (state) => {
            state.value = 0
        }
    }
})

export default testSlice.reducer;
export const { increment, decrement, reset } = testSlice.actions;

