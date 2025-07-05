import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import CarLandingPage from './components/CarLandingPage'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <motion.div 
        className="loading-screen"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <motion.div 
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.p 
          className="loading-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Loading Car Showroom...
        </motion.p>
      </motion.div>
    )
  }

  return (
    <div className="App">
      <main>
        <CarLandingPage />
      </main>
    </div>
  )
}

export default App
