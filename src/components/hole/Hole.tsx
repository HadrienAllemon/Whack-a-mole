import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { whack } from "../../store/gameSlice/gameSlice";
import PA_Hole from "../../assets/PA_Hole.png";
import PA_Mole_Spawn from "../../assets/PA_Mole.png";
import PA_Mole_Idle from "../../assets/PA_Mole_Idle.png";
import PA_Mole_Exit from "../../assets/PA_Mole_Exit.png";

interface HoleProps {
  x: number;
  y: number;
}

type HoleState = "inactive" | "spawning" | "idle" | "leaving" | "hit";

export const Hole: React.FC<HoleProps> = ({ x, y }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const moles = useSelector((state: RootState) => state.game.moles);
  const currentAnimation = useRef(0);
  const dispatch = useDispatch();

  const holeImg = useRef(new Image());
  const sprites = useRef({
    spawning: new Image(),
    idle: new Image(),
    leaving: new Image(),
  });

  const [holeState, setHoleState] = useState<HoleState>("inactive");

  useEffect(() => {
    holeImg.current.src = PA_Hole;
    holeImg.current.onload = ()=>animationHandler(0);
    sprites.current.spawning.src = PA_Mole_Spawn;
    sprites.current.idle.src = PA_Mole_Idle;
    sprites.current.leaving.src = PA_Mole_Exit;

    const canvas = canvasRef.current;
    if (canvas) ctxRef.current = canvas.getContext("2d");
  }, []);


  useEffect(() => {
    const mole = moles.find((m) => m.x === x && m.y === y);
    if (mole && holeState === "inactive") setHoleState("spawning");
  }, [moles]);

  const animateSprite = useCallback(
    (
      image: HTMLImageElement,
      frameCount: number,
      nextState: HoleState,
      frame: number = 0
    ): number => {
      const ctx = ctxRef.current;
      if (!ctx) return 0;
      const frameWidth = image.width / frameCount;
      const frameHeight = image.height;
      const currentFrame = Math.floor(frame / 7) % frameCount;

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(holeImg.current, 0, 0);
      ctx.drawImage(
        image,
        currentFrame * frameWidth,
        0,
        frameWidth,
        frameHeight,
        0,
        0,
        frameWidth,
        frameHeight
      );

      if (frame < (frameCount - 1) * 7) return frame + 1;
      setHoleState(nextState);
      console.log("setting state to", nextState);
      return 0;
    },
    []
  );

  const animationHandler = useCallback(
    (frame: number = 0) => {
      const ctx = ctxRef.current;
      if (!ctx) return;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(holeImg.current, 0, 0);

      if (holeState === "spawning") {
        frame = animateSprite(sprites.current.spawning, 6, "idle", frame);
      } else if (holeState === "idle") {
        frame = animateSprite(sprites.current.idle, 7, "leaving", frame);
      } else if (holeState === "leaving") {
        frame = animateSprite(sprites.current.leaving, 6, "inactive", frame);
      }

      currentAnimation.current = requestAnimationFrame(() => animationHandler(frame));
    },
    [holeState, animateSprite]
  );

  useEffect(() => {
    if (holeImg.current.complete) animationHandler(0);
    else holeImg.current.onload = () => animationHandler(0);
    return () => {
      if (currentAnimation.current)
        cancelAnimationFrame(currentAnimation.current);
    };
  }, [animationHandler]);

  const handleClick = () => dispatch(whack({ x, y }));

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      width={55}
      height={55}
      style={{
        cursor: "pointer",
        height: "100%",
        width: "100%",
        imageRendering: "pixelated",
      }}
    />
  );
};
