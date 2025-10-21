import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { triggerGameOver } from "../../store/gameSlice/gameSlice";

export const Timer = () => {
    const [timeLeft, setTimeleft] = useState(10); 
    const dispatch = useDispatch();
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeleft((prevTime) => {
                const newTime = Math.max(0, prevTime - 1);
                if (newTime === 0) {
                    dispatch(triggerGameOver(true));
                }
                return newTime;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    return <div>{timeLeft}s</div>;
}