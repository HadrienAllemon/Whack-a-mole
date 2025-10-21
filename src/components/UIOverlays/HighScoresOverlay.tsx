import { useEffect, useState } from "react";
import { getHighscores } from "../../services/HighScoreServices";
import {  Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { toggleHighScores } from "../../store/pageSlice/pageSlice";

export const HighScoreOverlay = () => {
    const [scores, setScores] = useState<Array<{ name: string, score: number }>>([]);
    const displayScores = useSelector((state: RootState) => state.pageTracker.displayHighScores);
    const dispatch = useDispatch();
    

    useEffect(() => {
        getHighscores().then((scores) => {
            setScores(scores);
        })
    }, []);

    if (!displayScores) {
        return null;
    }

    return (
        <Flex backgroundColor={"rgba(0,0,0,0.8)"} color={"white"} height={"100vh"} width={"100vw"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} gap={"30px"} position={"absolute"} top={0} left={0} zIndex={10}>
            <Heading size="7xl" className="pixelFont">High Scores</Heading>
            <Flex flexDirection={"column"}  gap={"10px"} fontSize={"4xl"}>
                {scores.map((score, index) => (
                    <Flex key={index} justifyContent={"space-between"} maxWidth={"500px"} width={"100%"}>
                        <Text>
                        {index + 1}. {score.name}
                        </Text> 
                        <Text>
                        </Text> {score.score}
                    </Flex>
                ))}
            </Flex>
            <Button onClick={()=>dispatch(toggleHighScores())}> Back </Button>
        </Flex>

    );
}