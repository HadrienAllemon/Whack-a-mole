import { useSelector } from 'react-redux'
import './App.css'
import { Board } from './components/board/Board.tsx'
import { HomePage } from './components/homePage/HomePage.tsx'
import { MouseCanvas } from './components/UIOverlays/MouseCanvas.tsx'
import { ScreenShaker } from './components/UIOverlays/ScreenShaker.tsx'
import type { RootState } from './store/store.ts'
function App() {
  const page = useSelector((state: RootState) => state.pageTracker.currentPage);
  if (page === 'home') {
    return <HomePage />
  } else {
    return (
      <div>
        <MouseCanvas />
        <ScreenShaker>
          <Board />
        </ScreenShaker>
      </div>
    )
  }
}

export default App
