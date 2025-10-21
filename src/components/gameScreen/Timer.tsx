import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { triggerGameOver } from "../../store/gameSlice/gameSlice";

export const Timer = () => {
    const [timeLeft, setTimeleft] = useState(30); 
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
    return <div>{timeLeft}s</div>;
}