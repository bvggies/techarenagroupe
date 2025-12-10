import { motion, useScroll, useTransform } from 'framer-motion'
import { FiArrowDown, FiCode, FiSmartphone, FiGlobe } from 'react-icons/fi'
import { useState, useEffect, useRef } from 'react'
import CodeLoop from './CodeLoop'

const Hero = () => {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight })
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const techIcons = [
    { icon: FiCode, delay: 0 },
    { icon: FiSmartphone, delay: 0.2 },
    { icon: FiGlobe, delay: 0.4 },
  ]

  return (
    <motion.section
      ref={ref}
      id="home"
      style={{ opacity, scale }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      {/* Circuit Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 dark:opacity-3">
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="hero-circuit" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <path d="M 0 100 L 200 100 M 100 0 L 100 200 M 0 50 L 50 50 L 50 0 M 150 0 L 150 50 L 200 50 M 0 150 L 50 150 L 50 200 M 150 200 L 150 150 L 200 150" 
                stroke="currentColor" strokeWidth="2" fill="none" className="text-primary-600" />
              <circle cx="100" cy="100" r="4" fill="currentColor" className="text-primary-600" />
              <circle cx="50" cy="50" r="2" fill="currentColor" className="text-primary-600" />
              <circle cx="150" cy="50" r="2" fill="currentColor" className="text-primary-600" />
              <circle cx="50" cy="150" r="2" fill="currentColor" className="text-primary-600" />
              <circle cx="150" cy="150" r="2" fill="currentColor" className="text-primary-600" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-circuit)" />
        </svg>
      </div>
      {/* Animated Background Elements - Reduced on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(typeof window !== 'undefined' && window.innerWidth < 768 ? 8 : 20)].map((_, i) => {
          const randomX = Math.random() * dimensions.width
          const randomY = Math.random() * dimensions.height
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary-400 rounded-full opacity-20"
              initial={{
                x: randomX,
                y: randomY,
              }}
              animate={{
                y: [randomY, Math.random() * dimensions.height, randomY],
                x: [randomX, Math.random() * dimensions.width, randomX],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: 'loop',
              }}
              style={{ willChange: 'transform' }}
            />
          )
        })}
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-block mb-6"
            >
              <img
                src="/assets/logo.png"
                alt="TechArena Groupe"
                loading="eager"
                decoding="async"
                className="h-16 md:h-20 w-auto mx-auto drop-shadow-lg"
              />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="text-gradient">Let's Build</span>
              <br />
              <span className="text-gray-800 dark:text-white">Something Great</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Innovative tech solutions for your business. We create responsive websites,
            mobile apps, and custom software that drives results.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <motion.a
              href="#contact"
              className="px-8 py-4 bg-primary-600 text-white rounded-full font-semibold text-lg hover:bg-primary-700 transition-colors shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(14, 165, 233, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Today
            </motion.a>
            <motion.a
              href="#services"
              className="px-8 py-4 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 rounded-full font-semibold text-lg border-2 border-primary-600 dark:border-primary-400 hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Our Services
            </motion.a>
          </motion.div>

          {/* Coding Loop */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            <CodeLoop />
          </motion.div>

          {/* Tech Icons Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex justify-center space-x-8 mb-12"
          >
            {techIcons.map(({ icon: Icon, delay }) => (
              <motion.div
                key={delay}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 1 + delay,
                  type: 'spring',
                  stiffness: 200,
                  damping: 10,
                }}
                whileHover={{ scale: 1.2, rotate: 360 }}
                className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg"
              >
                <Icon className="w-8 h-8 text-primary-600" />
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <motion.a
              href="#services"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FiArrowDown className="w-6 h-6 text-primary-600" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default Hero

