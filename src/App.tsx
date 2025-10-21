import './App.css'
import { Board } from './components/board/Board.tsx'
import { MouseCanvas } from './components/UIOverlays/MouseCanvas.tsx'
import { ScreenShaker } from './components/UIOverlays/ScreenShaker.tsx'
import { addHighscore, getHighscores } from './services/HighScoreServices.ts'
function App() {
  // getHighscores().then((scores) => {
  //   console.log("Highscores:", scores);
  // })
  return (
    <>
      <div>
        <button onClick={async () => {
          const scores = await addHighscore({ name: "Player1", score: Math.floor(Math.random() * 1000) });
          console.log("Highscores:", scores);
        }
        }>Add Random Highscore</button>
        <MouseCanvas />
        <ScreenShaker>
          <Board />
        </ScreenShaker>
      </div>

    </>
  )
}

export default App
