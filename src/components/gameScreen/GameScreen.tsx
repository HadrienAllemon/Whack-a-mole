import { Button, Flex, Heading } from "@chakra-ui/react";
import { setPage } from "../../store/pageSlice/pageSlice";
import { reset, exitGame } from "../../store/gameSlice/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import { Board } from "../board/Board";
import type { RootState } from "../../store/store";
import { MouseCanvas } from "../UIOverlays/MouseCanvas";
import { ScreenShaker } from "../UIOverlays/ScreenShaker";
import { Timer } from "./Timer";

export const GameScreen = () => {
    const dispatch = useDispatch();
    const score = useSelector((state: RootState) => state.game.score);
    const level = useSelector((state: RootState) => state.game.level);

    const handleExit = () => {
        dispatch(exitGame());
        dispatch(setPage("home"));
    }
    return (
        <>
            <ScreenShaker>
                <div>
                    <Flex justifyContent={"space-between"} marginBottom="20px" >
                        <Heading size={"5xl"} className="pixelFont gameText">Score: {score}</Heading>
                        <Heading size={"5xl"} className="pixelFont gameText"><Timer /></Heading>
                        <Heading size={"5xl"} className="pixelFont gameText">Level: {level}</Heading>
                    </Flex>
                    <Board />
                    <MouseCanvas />
                    <Flex justifyContent={"space-around"} marginTop="20px">
                        <Button size="2xl" fontSize="2xl" onClick={handleExit}>Back</Button>
                        <Button size="2xl" fontSize="2xl" onClick={() => dispatch(reset())}>Restart</Button>
                    </Flex>
                </div>
            </ScreenShaker>
        </>
    )
}