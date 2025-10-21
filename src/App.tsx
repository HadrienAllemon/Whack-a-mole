import { useSelector } from 'react-redux'
import './App.css'
import { HomePage } from './components/homePage/HomePage.tsx'
import type { RootState } from './store/store.ts'
import { GameScreen } from './components/gameScreen/GameScreen.tsx'
import { HighScoreOverlay } from './components/UIOverlays/HighScoresOverlay.tsx'
import { GameOverOverlay } from './components/UIOverlays/GameOverOverlay.tsx'
import { ScreenShaker } from './components/UIOverlays/ScreenShaker.tsx'
function App() {
  const page = useSelector((state: RootState) => state.pageTracker.currentPage);

  return (
    <div >
      <HighScoreOverlay />
      <GameOverOverlay />
      <ScreenShaker>

        {page === "home" ?
          <HomePage /> :
          <GameScreen />
        }
      </ScreenShaker>
    </div>
  )

}

export default App
