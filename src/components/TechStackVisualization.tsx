import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  FiCode, FiDatabase, FiSmartphone, FiGlobe, FiCloud, 
  FiCpu, FiServer, FiLock, FiZap, FiLayers 
} from 'react-icons/fi'

const techIcons = [
  { icon: FiCode, label: 'Frontend', color: 'text-blue-500', delay: 0 },
  { icon: FiDatabase, label: 'Backend', color: 'text-green-500', delay: 0.1 },
  { icon: FiSmartphone, label: 'Mobile', color: 'text-purple-500', delay: 0.2 },
  { icon: FiGlobe, label: 'Web', color: 'text-cyan-500', delay: 0.3 },
  { icon: FiCloud, label: 'Cloud', color: 'text-orange-500', delay: 0.4 },
  { icon: FiCpu, label: 'AI/ML', color: 'text-pink-500', delay: 0.5 },
  { icon: FiServer, label: 'DevOps', color: 'text-red-500', delay: 0.6 },
  { icon: FiLock, label: 'Security', color: 'text-yellow-500', delay: 0.7 },
  { icon: FiZap, label: 'Performance', color: 'text-indigo-500', delay: 0.8 },
  { icon: FiLayers, label: 'Architecture', color: 'text-teal-500', delay: 0.9 },
]

const TechStackVisualization = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="py-12 bg-gradient-to-br from-gray-900 via-gray-800 to-black dark:from-black dark:via-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(14, 165, 233, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(14, 165, 233, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Our Tech Expertise
          </h3>
          <p className="text-gray-400">
            Cutting-edge technologies powering innovative solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {techIcons.map((tech, index) => {
            const Icon = tech.icon
            const isHovered = hoveredIndex === index

            return (
              <motion.div
                key={tech.label}
                initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: tech.delay, type: 'spring', stiffness: 200 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="relative group"
              >
                <motion.div
                  animate={{
                    scale: isHovered ? 1.2 : 1,
                    rotate: isHovered ? [0, -10, 10, -10, 0] : 0,
                  }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="relative w-20 h-20 mx-auto mb-3">
                    {/* Glow Effect */}
                    <motion.div
                      animate={{
                        opacity: isHovered ? [0.5, 1, 0.5] : 0.3,
                        scale: isHovered ? [1, 1.2, 1] : 1,
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${tech.color.replace('text-', 'bg-')} blur-xl`}
                    />
                    
                    {/* Icon Container */}
                    <div className="relative w-full h-full bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 flex items-center justify-center group-hover:border-primary-500 transition-colors">
                      <Icon className={`w-10 h-10 ${tech.color}`} />
                    </div>
                  </div>

                  {/* Label */}
                  <motion.p
                    animate={{ opacity: isHovered ? 1 : 0.7 }}
                    className="text-center text-sm text-gray-300 font-medium"
                  >
                    {tech.label}
                  </motion.p>

                  {/* Connection Lines */}
                  {index < techIcons.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary-500 to-transparent opacity-30" />
                  )}
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Floating Code Snippets */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, opacity: 0 }}
              animate={{
                y: [null, Math.random() * window.innerHeight],
                opacity: [0, 0.1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: i * 2,
              }}
              className="absolute text-xs font-mono text-primary-400"
            >
              {['const', 'function', 'async', 'await', 'return'][i]}()
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TechStackVisualization

