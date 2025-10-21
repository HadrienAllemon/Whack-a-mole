import { useSelector } from 'react-redux'
import './App.css'
import { HomePage } from './components/homePage/HomePage.tsx'
import type { RootState } from './store/store.ts'
import { GameScreen } from './components/gameScreen/GameScreen.tsx'
import { HighScoreOverlay } from './components/UIOverlays/HighScoresOverlay.tsx'
import { GameOverOverlay } from './components/UIOverlays/GameOverOverlay.tsx'
function App() {
  const page = useSelector((state: RootState) => state.pageTracker.currentPage);

  return (
    <div>
      <HighScoreOverlay />
      <GameOverOverlay/>
      {page === "home" ?
        <HomePage /> :
        <GameScreen />
      }
    </div>
  )

}

export default App
