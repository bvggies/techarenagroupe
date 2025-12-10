import { motion } from 'framer-motion'

const techStack = [
  'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'React Native', 'Expo',
  'Next.js', 'Tailwind CSS', 'Framer Motion', 'Express', 'MongoDB',
  'Firebase', 'AWS', 'Vercel', 'GitHub', 'Docker', 'GraphQL', 'REST API'
]

const TechTicker = () => {
  return (
    <div className="py-12 bg-gray-900 dark:bg-black text-white overflow-hidden">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 dark:from-black via-transparent to-gray-900 dark:to-black z-10" />
        <motion.div
          className="flex space-x-8"
          animate={{
            x: [0, -50 * techStack.length * 2],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: typeof window !== 'undefined' && window.innerWidth < 768 ? 40 : 30,
              ease: 'linear',
            },
          }}
        >
          {[...techStack, ...techStack].map((tech, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-6 py-3 bg-primary-600/20 backdrop-blur-sm rounded-full border border-primary-500/30"
            >
              <span className="text-lg font-semibold text-primary-300">{tech}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default TechTicker

