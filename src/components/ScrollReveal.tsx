import { ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale' | 'rotate'
  delay?: number
  duration?: number
  className?: string
  distance?: number
}

const ScrollReveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
  distance = 50,
}: ScrollRevealProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const directions = {
    up: { initial: { y: distance, opacity: 0 }, animate: { y: 0, opacity: 1 } },
    down: { initial: { y: -distance, opacity: 0 }, animate: { y: 0, opacity: 1 } },
    left: { initial: { x: distance, opacity: 0 }, animate: { x: 0, opacity: 1 } },
    right: { initial: { x: -distance, opacity: 0 }, animate: { x: 0, opacity: 1 } },
    fade: { initial: { opacity: 0 }, animate: { opacity: 1 } },
    scale: { initial: { scale: 0.8, opacity: 0 }, animate: { scale: 1, opacity: 1 } },
    rotate: { initial: { rotate: -10, opacity: 0 }, animate: { rotate: 0, opacity: 1 } },
  }

  const animation = directions[direction]

  return (
    <motion.div
      ref={ref}
      initial={animation.initial}
      animate={isInView ? animation.animate : animation.initial}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default ScrollReveal

