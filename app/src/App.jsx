import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Cours from "./components/cours/Cours.jsx";
import ListeCours from "./components/cours/ListeCours.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <ListeCours/>
    </>
  )
}

export default App
