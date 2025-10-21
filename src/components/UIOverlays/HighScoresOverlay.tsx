import { useEffect, useMemo, useState } from "react";
import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { setPage, toggleHighScores } from "../../store/pageSlice/pageSlice";
import { addHighscore, getHighscores } from "../../services/HighScoreServices";
import { triggerNewScore } from "../../store/gameSlice/gameSlice";

type ScoreEntry = { name: string; score: number };

export const HighScoreOverlay = () => {
    const dispatch = useDispatch();

    const [scores, setScores] = useState<ScoreEntry[]>([]);
    const displayScores = useSelector(
        (state: RootState) => state.pageTracker.displayHighScores
    );
    const currentScore = useSelector((state: RootState) => state.game.score);
    const newScore = useSelector((state: RootState) => state.game.newScore);
    const [newScoreName, setNewScoreName] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        getHighscores().then((_scores)=>{
            _scores = _scores.sort((a,b)=>b.score - a.score);
            setScores(_scores || []);
        }).catch(console.error);
    }, []);

    const newHighScore = () => {
        setSaving(true);
        addHighscore({ name: newScoreName || "Anonymous", score: currentScore }).then(async () => {
            const scores = await getHighscores().catch(console.error);
            setScores(scores || []);
            dispatch(triggerNewScore(false));
            setNewScoreName("");
            setSaving(false);
        }).catch(console.error);
    }

    const visibleScores = useMemo(() => {
        const currentScoreIndex = scores.findIndex(
            (s) => currentScore > s.score
        );

        const insertIndex = currentScoreIndex === -1 ? scores.length : currentScoreIndex;
        const list = scores.slice(0, 10);

        if (newScore) {
            list.splice(insertIndex, 0, { name: "", score: currentScore });
        }

        return list.slice(0, 10);
    }, [scores, currentScore, newScore]);

    const backToTitle = () => {
        dispatch(toggleHighScores());
        dispatch(setPage("home"));
        dispatch(triggerNewScore(false));
        setNewScoreName("");
    }

    if (!displayScores) return null;

    return (
        <Flex
            bg="rgba(0,0,0,0.85)"
            color="white"
            position="absolute"
            top={0}
            left={0}
            zIndex={10}
            height="100vh"
            width="100vw"
            direction="column"
            align="center"
            justify="center"
            gap={10}
            p={4}
        >
            <Heading size="4xl" className="pixelFont">
                High Scores
            </Heading>

            <Flex direction="column" gap={3} fontSize="3xl" width="90%" maxW="500px">
                {visibleScores.map((score, index) => {
                    const isNew = newScore && score.score === currentScore && score.name === "";
                    return (
                        <Flex
                            key={index}
                            justify="space-between"
                            align="center"
                            w="100%"
                            px={2}
                        >
                            {isNew ? (
                                <Flex align="center" gap={2}>
                                    <Text>{index + 1}.</Text>
                                        <Input
                                            className="newScoreInput pixelFont"
                                            flexGrow={0}
                                            placeholder="Enter Name"
                                            size="sm"
                                            value={newScoreName}
                                            onChange={(event) => setNewScoreName(event.target.value.slice(0, 20))}
                                        />
                                </Flex>
                            ) : (
                                <Text>
                                    {index + 1}. {score.name || "Anonymous"}
                                </Text>
                            )}
                            <Text>{score.score}</Text>
                        </Flex>
                    );
                })}
            </Flex>
            <Flex justifyContent={"space-around"} maxWidth={"500px"} width={"100%"}>
                <Button
                    onClick={backToTitle}
                    size="2xl"
                    fontSize="2xl"
                >
                    Back to Title
                </Button>
                {newScore &&
                    <Button
                        onClick={newHighScore}
                        size="2xl"
                        fontSize="2xl"
                        loading={saving}
                    >
                        Save
                    </Button>}
            </Flex>
        </Flex>
    );
};
