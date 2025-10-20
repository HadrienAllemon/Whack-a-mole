import { useDispatch, useSelector } from "react-redux"
import { Hole } from "../hole/Hole"
import { start, spawnMole } from "../../store/gameSlice/gameSlice";
import type { RootState } from "../../store/store";
import { useCallback, useEffect, useRef } from "react";

export const Board = () => {
    const moles = useSelector((state: RootState) => state.game.moles)
    const coordinates = useSelector((state: RootState) => state.game.coordinates)
    const level = useSelector((state: RootState) => state.game.level)
    const running = useSelector((state: RootState) => state.game.running)
    const spawnRateInterval = useRef<number | null>(null);
    const dispatch = useDispatch();

    const getNewMolePosition = useCallback(() => {
        const emptyHoles = coordinates.flat().filter(coord =>
            !moles.some(mole => mole.x === coord.x && mole.y === coord.y)
        );
        if (emptyHoles.length === 0) return;
        const randomIndex = Math.floor(Math.random() * emptyHoles.length);
        const { x, y } = emptyHoles[randomIndex];
        dispatch(spawnMole({ x, y }));
    }, [coordinates, moles, dispatch]);

    useEffect(() => {
        if (running === false) return;
        const timer = 2000 / (1 + level * 2);
        clearInterval(spawnRateInterval.current!);
        spawnRateInterval.current = window.setInterval(() => {
            getNewMolePosition();
        }, timer);

        return () => {
            if (spawnRateInterval.current) {
                clearInterval(spawnRateInterval.current);
            }
        }
    }, [level, running])

    return (
        <div>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 165px)',
                gridTemplateRows: 'repeat(3, 165px)',
                rowGap: '00px',
                columnGap: '50px',
            }}>
                {coordinates.flat().map((coord, index) => (
                    <Hole key={index} x={coord.x} y={coord.y} />
                ))}
            </div>
            <button onClick={() => dispatch(start())}>Start</button>
            <h2>Level: {level}</h2>
            <button onClick={() => console.log(level)}>Level</button>
        </div >
    )
}