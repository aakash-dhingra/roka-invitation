import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, motion } from 'framer-motion'
import { Intro } from './components/Intro'
import App from './App'
import './style.css'

function Root() {
  const [showIntro, setShowIntro] = useState(true)

  return (
    <AnimatePresence mode="sync">
      {showIntro ? (
        <Intro key="intro" onEnter={() => setShowIntro(false)} />
      ) : (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          <App />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
