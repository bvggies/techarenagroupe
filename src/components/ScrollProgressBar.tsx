import { useScroll, useSpring } from 'framer-motion'
import { motion } from 'framer-motion'

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-600 origin-left z-50 shadow-lg"
      style={{ scaleX }}
    />
  )
}

export default ScrollProgressBar

