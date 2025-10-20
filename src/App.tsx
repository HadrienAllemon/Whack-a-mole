import './App.css'
import { Board } from './components/board/Board.tsx'
import { MouseCanvas } from './components/mouseCanvas/MouseCanvas.tsx'
function App() {

  return (
    <>
      <div>
        <MouseCanvas/>
        <Board />
      </div>

    </>
  )
}

export default App
