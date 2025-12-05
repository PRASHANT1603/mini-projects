import { useState } from 'react'
import MyDay from './MyDay/MyDay'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MyDay/>
    </>
  )
}

export default App
