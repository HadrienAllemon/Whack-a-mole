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
    moles: Mole[];
    score: number;
    running: boolean;
    level: number;
    gameover: boolean;
    newScore:boolean;
    coordinates: Coordinate[][];
}

const initialState: GameState = {
    moles: [],
    score: 0,
    running: false,
    level:1,
    gameover:false,
    newScore:false,
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
        reset(state) {
            state.moles = [];
            state.score = 0;
            state.level = 1;
            state.gameover = false;
        },
        exitGame(state) {
            state.running = false;
            state.moles = [];
            state.gameover = false;
            state.score = 0;
            state.level = 1;
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
            }
        },
        triggerGameOver(state, action: PayloadAction<boolean>) {
            state.gameover = action.payload;
            state.running = false;
            state.moles = [];
        },
        triggerNewScore(state, action: PayloadAction<boolean>) {
            state.newScore = action.payload;
            state.gameover = false;
            state.running = false;
            state.moles = [];
        }
    },
});

export default gameSlice.reducer;
export const { start, spawnMole, despawnMole, whack, reset, exitGame, triggerGameOver, triggerNewScore } = gameSlice.actions;