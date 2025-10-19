import { useDispatch, useSelector } from "react-redux"
import { Hole } from "../hole/Hole"
import { start, spawnMole } from "../../store/gameSlice/gameSlice";
import type { RootState } from "../../store/store";
import { useEffect, useRef } from "react";

export const Board = () => {
    const moles = useSelector((state:RootState) => state.game.moles)
    const coordinates = useSelector((state: RootState) => state.game.coordinates)
    const level = useSelector((state: RootState) => state.game.level)
    const running = useSelector((state: RootState) => state.game.running)
    const spawnRateInterval = useRef<number | null>(null);
    const dispatch = useDispatch();

    const getNewMolePosition = () => {
        const emptyHoles = coordinates.flat().filter(coord =>
            !moles.some(mole => mole.x === coord.x && mole.y === coord.y)
        );
        if (emptyHoles.length === 0) return;
        const randomIndex = Math.floor(Math.random() * emptyHoles.length);
        const { x, y } = emptyHoles[randomIndex];
        dispatch(spawnMole({x, y}));
        
    }

    useEffect(()=> {
        if (running === false) return;
        const timer = 2000 / (1 + level*2);
        clearInterval(spawnRateInterval.current!);
        spawnRateInterval.current = window.setInterval(() => {
            getNewMolePosition();
        }, timer);

        return () => {
            if (spawnRateInterval.current) {
                clearInterval(spawnRateInterval.current);
            }
        }
    },[level, running])

    return (
        <div>
            {coordinates.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex' }}>
                    {row.map((coord, colIndex) => (
                        <div key={colIndex} style={{ width: 100, height: 100, border: '1px solid black' }}>
                            <Hole x={coord.x} y={coord.y} />
                        </div>
                    ))}
                </div>
            ))}
            <button onClick={() => dispatch(start())}>Start</button>
            <h2>Level: {level}</h2>
            <button onClick={() => console.log(level)}>Level</button>
        </div>
    )
}