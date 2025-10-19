import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { despawnMole, whack } from "../../store/gameSlice/gameSlice";

interface HoleProps {
    x: number;
    y: number;
}

export const Hole: React.FC<HoleProps> = ({ x, y }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const [animation, setAnimation] = useState<number | null>(null);
    const moles = useSelector((state: RootState) => state.game.moles)
    const dispatch = useDispatch()
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            ctxRef.current = canvas.getContext("2d");
        }
    }, []);
    // useEffect(() => {
    //     if (ctxRef.current) {
    //         console.log("context updated");
    //         animation && cancelAnimationFrame(animation);
    //         setAnimation(requestAnimationFrame(drawHole))
    //     }
    // }, [moles, ctxRef.current])

    useEffect(() => {
        drawHole();
    }, [moles]);

    const drawHole = () => {
        const ctx = ctxRef.current;
        if (!ctx) return;
        const mole = moles.find((m) => m.x === x && m.y === y);
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;

        ctx.clearRect(0, 0, width, height);

        if (mole) {
            ctx.fillStyle = "brown";
            ctx.beginPath();
            ctx.arc(width / 2, height / 2, 25, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.ellipse(width / 2, height * 0.7, 30, 10, 0, 0, Math.PI * 2);
            ctx.fill();
        }
    };

    const handleClick = () => {
        dispatch(whack({ x, y }))
    }

    return (
        <div>
            <canvas
                ref={canvasRef}
                onClick={handleClick}
                width={100}
                height={100}
                style={{ cursor: "pointer" }}
            />
        </div>
    )
}