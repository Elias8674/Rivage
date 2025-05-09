import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Cours from "./cours/Cours.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        < Cours/>
    </>
  )
}

export default App
