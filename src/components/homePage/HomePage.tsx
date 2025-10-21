import { Box, Button, Flex, Image } from "@chakra-ui/react";
import TitleImg from "../../assets/Title.png";
import { useDispatch } from "react-redux";
import { setPage, toggleHighScores } from "../../store/pageSlice/pageSlice";
import { start } from "../../store/gameSlice/gameSlice";

export const HomePage: React.FC = () => {
    const dispatch = useDispatch();
    const handleNewGame = () => {
        dispatch(setPage("game"));
        dispatch(start())
    }

    const handleHighScore = () => {
        dispatch(toggleHighScores())
    }
    return (
        <Box height={"100vh"} width={"100vw"} >
            <Flex justifyContent={"space-between"} alignItems={"center"} gap={"20px"} padding={"50px"} flexDirection={"column"} height={"100%"}>
                <Image imageRendering={"pixelated"} maxW={"864px"} w="100%" src={TitleImg} alt="Game Title" />
                <Flex justifyContent={"space-around"} width={"100%"} maxW="500px">
                    <Button size={"2xl"} fontSize={"2xl"} onClick={handleNewGame}>New Game</Button>
                    <Button size={"2xl"} fontSize={"2xl"} onClick={handleHighScore}>High Scores</Button>
                </Flex>
            </Flex>
        </Box>
    );
}