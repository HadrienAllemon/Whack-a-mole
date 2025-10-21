import { useEffect, useState } from "react";

export const Timer = () => {
    const [timeLeft, setTimeleft] = useState(30); 
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeleft((prevTime) => Math.max(0, prevTime - 1));
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    return <div>{timeLeft}s</div>;
}