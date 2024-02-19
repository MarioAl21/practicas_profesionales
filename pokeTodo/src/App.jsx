import { useState } from 'react'
import './App.css'
import { PokeTable } from './components/PokeTable';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>     
      <h1>Pokemon Capture App</h1>
      <PokeTable />
    </>
  )
}

export default App
