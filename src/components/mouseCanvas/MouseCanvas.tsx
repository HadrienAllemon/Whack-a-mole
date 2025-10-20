import { useEffect, useRef, useState } from "react";
import PA_HAMMER from "../../assets/PA_HAMMER.png";

export const MouseCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const mouseImage = useRef(new Image());
    const mousePos = useRef({ x: 0, y: 0 });
    const [animated, setAnimated] = useState(false);
    const maxFrames = import.meta.env.VITE_MAX_HAMMER_FRAMES || 9;
    const [frameData, setFramedData] = useState({
        frameWidth: 110,
        frameWidthScaled: 110,
        frameHeight: 96,
        frameHeightScaled: 96
    })

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        ctxRef.current = canvas.getContext("2d");
        ctxRef.current!.imageSmoothingEnabled = false;
        mouseImage.current.src = PA_HAMMER;
        mouseImage.current.onload = () => {
            setFramedData({
                frameWidth: mouseImage.current.width / maxFrames,
                frameWidthScaled: (mouseImage.current.width / maxFrames) * 3,
                frameHeight: mouseImage.current.height,
                frameHeightScaled: mouseImage.current.height * 3,
            })
        }
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useEffect(() => {
        let frameId: number;
        const render = () => {
            if (animated) return;
            const ctx = ctxRef.current;
            if (!ctx) return;
            const { x, y } = mousePos.current;
            const w = ctx.canvas.width;
            const h = ctx.canvas.height;
            ctx.clearRect(0, 0, w, h);
            ctx.drawImage(mouseImage.current,
                0,
                0,
                frameData.frameWidth,
                frameData.frameHeight,
                x - frameData.frameWidthScaled / 4,
                y - frameData.frameHeightScaled,
                frameData.frameWidthScaled,
                frameData.frameHeightScaled);
            frameId = requestAnimationFrame(render);
        };
        render();
        return () => cancelAnimationFrame(frameId);
    }, [frameData]);

    useEffect(() => {
        const animateHammer = (frame: number = 0) => {
            const currentFrame = Math.floor(frame / 7) % maxFrames;
            const ctx = ctxRef.current;
            if (!ctx) return;
            
            const { x, y } = mousePos.current;
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.drawImage(mouseImage.current,
                frameData.frameWidth * currentFrame,
                0,
                frameData.frameWidth,
                frameData.frameHeight,
                x - frameData.frameWidthScaled / 4,
                y - frameData.frameHeightScaled,
                frameData.frameWidthScaled,
                frameData.frameHeightScaled
            );
            if (frame > maxFrames * 7) {
                setAnimated(false);
                return;
            } else {
                requestAnimationFrame(() => animateHammer(frame + 1));
            } 
        };
        const listener = () => animateHammer()
        window.addEventListener("click", listener)
        return () => window.removeEventListener("click", listener)
    }, [frameData]);



    return (
        <canvas
            ref={canvasRef}
            width={window.innerWidth}
            height={window.innerHeight}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: "none",
                cursor: "none",
                imageRendering: "pixelated",
                zIndex: 999,
            }}
        />
    );
};