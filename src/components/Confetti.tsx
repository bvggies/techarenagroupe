import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface ConfettiProps {
  trigger: boolean
  onComplete?: () => void
}

const Confetti = ({ trigger, onComplete }: ConfettiProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; delay: number; color: string }>>([])

  useEffect(() => {
    if (trigger) {
      const colors = ['#0ea5e9', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444']
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      }))
      setParticles(newParticles)

      if (onComplete) {
        setTimeout(onComplete, 3000)
      }
    }
  }, [trigger, onComplete])

  if (!trigger) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ y: -10, x: 0, rotate: 0, opacity: 1 }}
          animate={{
            y: window.innerHeight + 100,
            x: [0, Math.random() * 200 - 100, Math.random() * 200 - 100],
            rotate: [0, 360, 720],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 3,
            delay: particle.delay,
            ease: 'easeOut',
          }}
          className="absolute w-3 h-3 rounded-sm"
          style={{
            left: `${particle.x}%`,
            backgroundColor: particle.color,
          }}
        />
      ))}
    </div>
  )
}

export default Confetti

