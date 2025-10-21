import { useEffect, useRef, type PropsWithChildren } from "react";
import createScreenShake from "../../utils/screenshake";
import { on } from "../../events/eventBus";

export const ScreenShaker: React.FC<PropsWithChildren> = ({ children }) => {
  const shake = useRef(createScreenShake({ maxOffsetX: 250, maxOffsetY: 250, maxAngle: 15 }));
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frameId: number;
    const loop = (time: number) => {
      const { offsetX, offsetY, angle } = shake.current.update(time);
      const el = divRef.current;
      if (el) el.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${angle}deg)`;
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    const unsubscribe = on("whack", () => {
      shake.current.add(0.5);
    });
    return unsubscribe;
  }, []);

  return (
    <div
      ref={divRef}
      className="shaker"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "transform 0.05s linear",
      }}
    >
      {children}
    </div>
  );
};
