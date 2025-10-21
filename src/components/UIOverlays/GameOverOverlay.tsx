import { Button, Flex, Heading } from "@chakra-ui/react"
import type { RootState } from "../../store/store";
import {useDispatch, useSelector } from "react-redux";
import { reset } from "../../store/gameSlice/gameSlice";
import { setPage } from "../../store/pageSlice/pageSlice";

export const GameOverOverlay = () => {
    const displayGameOver = useSelector((state: RootState) => state.game.gameover);
    const score = useSelector((state: RootState) => state.game.score);
    const dispatch = useDispatch();
    const toTitleScreen = () => {
        dispatch(reset());
        dispatch(setPage("home"));
    }
    if (!displayGameOver) {
        return null;
    }
    return (
        <Flex backgroundColor={"rgba(0,0,0,0.8)"} color={"white"} height={"100vh"} width={"100vw"} flexDirection={"column"} justifyContent={"center"}  alignItems={"center"} gap={"50px"}  position={"absolute"} top={0} left={0} zIndex={10}>
            <Heading size="7xl" className="pixelFont gameover">Game Over</Heading>
            <Heading size="5xl" className="pixelFont">Your Score: {score}</Heading>
            <Flex justifyContent={"space-around"} maxWidth={"500px"} width={"100%"}>
                <Button size="2xl" fontSize="2xl" onClick={toTitleScreen}>Title Screen</Button>
                <Button size="2xl" fontSize="2xl">Save High score</Button>
            </Flex >
        </Flex>
    )
}