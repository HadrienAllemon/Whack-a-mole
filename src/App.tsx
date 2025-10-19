import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from './store/store.ts'
function App() {
  const count = useSelector((state: RootState) => state.test.value)
  const dispatch = useDispatch(  )

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        count is {count}
      </div>
      <div>
        <button onClick={() => dispatch({ type: 'test/increment' })}>
          Increment
        </button>
        <button onClick={() => dispatch({ type: 'test/decrement' })}>
          Decrement
        </button>
        <button onClick={() => dispatch({ type: 'test/reset' })}>
          Reset
        </button>
      </div>

    </>
  )
}

export default App
