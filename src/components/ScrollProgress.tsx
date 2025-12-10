import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx =
        document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = winHeightPx > 0 ? (scrollPx / winHeightPx) * 100 : 0
      setScrollProgress(scrolled)
    }

    window.addEventListener('scroll', updateScrollProgress)
    updateScrollProgress() // Initial call
    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
      <motion.div
        className="h-full bg-gradient-to-r from-primary-600 to-primary-400 origin-left"
        style={{ width: `${scrollProgress}%` }}
        initial={{ width: 0 }}
        transition={{ duration: 0.1 }}
      />
    </div>
  )
}

export default ScrollProgress

