import './App.css'
import { Board } from './components/board/Board.tsx'
import { MouseCanvas } from './components/UIOverlays/MouseCanvas.tsx'
import { ScreenShaker } from './components/UIOverlays/ScreenShaker.tsx'
function App() {

  return (
    <>
      <div>
        <MouseCanvas />
        <ScreenShaker>
          <Board />
        </ScreenShaker>
      </div>

    </>
  )
}

export default App
