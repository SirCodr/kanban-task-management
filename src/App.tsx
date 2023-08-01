import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import Tasks from './views/tasks'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-full h-screen'>
      <Navbar />
      <Tasks />
    </div>
  )
}

export default App
