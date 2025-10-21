import { useSelector } from 'react-redux'
import './App.css'
import { HomePage } from './components/homePage/HomePage.tsx'
import type { RootState } from './store/store.ts'
import { GameScreen } from './components/gameScreen/GameScreen.tsx'
function App() {
  const page = useSelector((state: RootState) => state.pageTracker.currentPage);
  if (page === 'home') {
    return <HomePage />
  } else {
    return (
      <div>
        <GameScreen />
      </div>
    )
  }
}

export default App
