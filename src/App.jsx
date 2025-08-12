import React from 'react'
import './App.css'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Pages from './app/Pages'


function App() {
    useEffect(() => {
        AOS.init({ duration: 1000 });
      }, []);

  return (
    <div
      style={{
      backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 2px, #f3f4f6 2px, #f3f4f6 4px)",
    }}
    >
        <Pages />
    </div>
  )
}

export default App


