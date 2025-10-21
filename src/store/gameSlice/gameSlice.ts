import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Mole {
    x: number;
    y: number;
    visible: boolean;
}

interface Coordinate {
    x: number;
    y: number;
}

interface GameState {
    shaking:boolean;
    moles: Mole[];
    score: number;
    running: boolean;
    coordinates: Coordinate[][];
    level: number;
}

const initialState: GameState = {
    moles: [],
    score: 0,
    running: false,
    shaking:false,
    level:1,
    coordinates: Array.from({ length: 3 }, (_, row) => {
        return Array.from({ length: 4 }, (_, col) => {
            return { x: row, y: col }
        })
    }),
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        start(state) {
            state.running = true;
            state.score = 0;            
        },
        shakeScreen(state, action: PayloadAction<boolean>) {
            console.log("Setting shaking to ", action.payload);
            state.shaking = action.payload;

        },
        
        spawnMole(state, action: PayloadAction<{ x: number; y: number }>) {
            const { x, y } = action.payload;
            state.moles.push({ x, y, visible: true });
        },
        despawnMole(state, action: PayloadAction<{ x: number; y: number }>) {
            const { x, y } = action.payload;
            state.moles = state.moles.filter((m) => !(m.x === x && m.y === y));
        },
        whack(state, action: PayloadAction<{ x: number; y: number }>) {
            const { x, y } = action.payload;
            const moleIndex = state.moles.findIndex((m) => m.x === x && m.y === y);
            if (moleIndex === -1) return; // No mole to whack
            state.score += 1;
            state.moles = state.moles.filter((m) => !(m.x === x && m.y === y));
            if (state.score % 10 === 0) {
                state.level += 1;
                console.log("Level Up!, you are now level " + state.level);
            }
        },
    },
});

export default gameSlice.reducer;
export const { start, spawnMole, despawnMole, whack, shakeScreen } = gameSlice.actions;