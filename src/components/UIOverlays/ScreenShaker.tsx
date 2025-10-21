import { useRef, useState, useEffect, type PropsWithChildren } from "react";
import createScreenShake from "../../utils/screenshake";
import { useDispatch, useSelector } from "react-redux";
import { shakeScreen } from "../../store/gameSlice/gameSlice";

export const ScreenShaker: React.FC<PropsWithChildren> = ({ children }) => {

    const shake = useRef(createScreenShake({maxOffsetX:250, maxOffsetY:250, maxAngle:15}));
    const shaking = useSelector((state: any) => state.game.shaking);
    const dispatch = useDispatch();
    const [shakeTransform, setShakeTransform] = useState({ x: 0, y: 0, r: 0 });

    useEffect(() => {
        let frameId: number;
        const loop = (time: number) => {
            const { offsetX, offsetY, angle } = shake.current.update(time);
            setShakeTransform({ x: offsetX, y: offsetY, r: angle });
            frameId = requestAnimationFrame(loop);
        };
        loop(0);
        return () => cancelAnimationFrame(frameId);
    }, []);

    const triggerShake = () => shake.current.add(0.5);
    useEffect(() => {
        if (shaking) {
            triggerShake();
            setTimeout(() => {
                dispatch(shakeScreen(false));
            }, 500);
        }
    }, [shaking]);

    return (
        <div
            style={{
                transform: `translate(${shakeTransform.x}px, ${shakeTransform.y}px) rotate(${shakeTransform.r}deg)`,
                transition: "transform 0.05s linear",
            }}
        >
            {children}
        </div>
    );
}