import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { whack } from "../../store/gameSlice/gameSlice";
import WAM_Hole from "../../assets/WAM_Hole.png"
import WAM_Mole from "../../assets/WAM_Mole.png"
import PA_Hole from "../../assets/PA_Hole.png"
import PA_Mole from "../../assets/PA_Mole.png"

const PA_Hole_Image = new Image();
PA_Hole_Image.src = PA_Hole;
const PA_Mole_Image = new Image();
PA_Mole_Image.src = PA_Mole;

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
        ctx.drawImage(PA_Hole_Image, 0, 0, PA_Hole_Image.width, PA_Hole_Image.height)

        if (mole) {
            ctx.drawImage(PA_Mole_Image, 0, 0, PA_Mole_Image.width, PA_Mole_Image.height);
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
                width={55}
                height={55}
                style={{ cursor: "pointer", height:"100%", width:"100%", imageRendering: "pixelated" }}
            />
        </div>
    )
}