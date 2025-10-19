import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { whack } from "../../store/gameSlice/gameSlice";
import WAM_Hole from "../../assets/WAM_Hole.png"
import WAM_Mole from "../../assets/WAM_Mole.png"
const WAM_Hole_Image = new Image();
WAM_Hole_Image.src = WAM_Hole;
const WAM_Mole_Image = new Image();
WAM_Mole_Image.src = WAM_Mole;

interface HoleProps {
    x: number;
    y: number;
}

export const Hole: React.FC<HoleProps> = ({ x, y }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const moles = useSelector((state: RootState) => state.game.moles)
    const dispatch = useDispatch()
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            ctxRef.current = canvas.getContext("2d");
        }
    }, []);


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
            ctx.drawImage(WAM_Mole_Image, 0, 0, width, height);
        } else {
            ctx.drawImage(WAM_Hole_Image, 0, 0, width, height);

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
                width={150}
                height={150}
                style={{ cursor: "pointer" }}
            />
        </div>
    )
}