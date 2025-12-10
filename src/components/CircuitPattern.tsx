import { motion } from 'framer-motion'

const CircuitPattern = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10 dark:opacity-5">
      <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            {/* Circuit Lines */}
            <motion.path
              d="M 0 50 L 100 50 M 50 0 L 50 100"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            />
            {/* Nodes */}
            <circle cx="50" cy="50" r="3" fill="currentColor" />
            <circle cx="0" cy="50" r="2" fill="currentColor" />
            <circle cx="100" cy="50" r="2" fill="currentColor" />
            <circle cx="50" cy="0" r="2" fill="currentColor" />
            <circle cx="50" cy="100" r="2" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" className="text-primary-500" />
      </svg>
    </div>
  )
}

export default CircuitPattern

