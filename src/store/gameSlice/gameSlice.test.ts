import gameReducer, { spawnMole, whack, despawnMole } from './gameSlice';

const initialState = {
    shaking:500,
    gameover: false,
    newScore: false,
    moles: [],
    score: 0,
    running: false,
    level: 1,
    coordinates: Array.from({ length: 3 }, (_, row) => {
        return Array.from({ length: 4 }, (_, col) => {
            return { x: row, y: col }
        })
    })
}

describe('gameSlice', () => {
    it('should spawn a mole', () => {
        const result = gameReducer(initialState, spawnMole(({ x: 0, y: 0 })));
        expect(result.moles).toStrictEqual([{ x: 0, y: 0, visible: true }]);
    });

    it('should despawn mole', () => {
        const stateWithMole = {
            ...initialState,
            moles: [{ x: 0, y: 0, visible: true }]
        };
        const result = gameReducer(stateWithMole, despawnMole(({ x: 0, y: 0 })));
        expect(result.moles).toStrictEqual([]);
    });

    it('should increment score when whack is dispatched on existing mole', () => {
        const stateWithMole = {
            ...initialState,
            moles: [{ x: 0, y: 0, visible: true }]
        };
        const result = gameReducer(stateWithMole, whack(({ x: 0, y: 0 })));
        expect(result.score).toStrictEqual(1);
        expect(result.moles).toStrictEqual([]);
    });
});