import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import './App.css'
import Sidebar from './layout/Sidebar'
import Chat from './pages/Chat'
import Settings from './pages/Settings'
import FAQ from './pages/Faq'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Sidebar />
<Routes>
   <Route path="/" element={<Chat />} />
   <Route path="/settings" element={<Settings />} />
   <Route path="/faq" element={<FAQ />} />
</Routes>
     
    </>
  )
}

export default App
