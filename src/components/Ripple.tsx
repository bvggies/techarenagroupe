import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface RippleProps {
  className?: string
  children: React.ReactNode
  color?: string
  duration?: number
}

interface RippleEffect {
  x: number
  y: number
  id: number
}

const Ripple = ({ className = '', children, color, duration = 600 }: RippleProps) => {
  const [ripples, setRipples] = useState<RippleEffect[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const rippleIdRef = useRef(0)

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newRipple: RippleEffect = {
      x,
      y,
      id: rippleIdRef.current++,
    }

    setRipples((prev) => [...prev, newRipple])

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
    }, duration)
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
    >
      {children}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              backgroundColor: color || 'rgba(255, 255, 255, 0.6)',
            }}
            initial={{
              width: 0,
              height: 0,
              x: '-50%',
              y: '-50%',
              opacity: 1,
            }}
            animate={{
              width: 300,
              height: 300,
              opacity: 0,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: duration / 1000,
              ease: 'easeOut',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default Ripple

