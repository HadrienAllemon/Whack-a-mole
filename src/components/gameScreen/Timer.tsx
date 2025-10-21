import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { triggerGameOver } from "../../store/gameSlice/gameSlice";
import type { RootState } from "../../store/store";

export const Timer = () => {
    const [timeLeft, setTimeleft] = useState(30); 
    const gameVersion = useSelector((state: RootState) => state.game.gameVersion);
    const dispatch = useDispatch();
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeleft((prevTime) => {
                const newTime = Math.max(0, prevTime - 1);
                if (newTime === 0) {
                    clearInterval(interval);
                    dispatch(triggerGameOver(true));
                    return 0;
                }
                return newTime;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        setTimeleft(30);
    }, [gameVersion]);
    return <div key={gameVersion}>{timeLeft}s</div>;
}