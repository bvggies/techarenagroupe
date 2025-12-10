import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowUp, FiMail, FiMessageCircle } from 'react-icons/fi'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
        setIsExpanded(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    setIsExpanded(false)
  }

  const handleWhatsApp = () => {
    window.open('https://wa.me/233549805296', '_blank')
    setIsExpanded(false)
  }

  const handleEmail = () => {
    window.location.href = 'mailto:techarenagroupe@gmail.com'
    setIsExpanded(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
          {/* WhatsApp Button */}
          <AnimatePresence>
            {isExpanded && (
              <motion.a
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0, y: 20 }}
                transition={{ delay: 0.1 }}
                href="https://wa.me/233549805296"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsApp}
                className="w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center group relative"
                aria-label="Contact via WhatsApp"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiMessageCircle className="w-6 h-6" />
                <span className="absolute right-full mr-3 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  WhatsApp Us
                </span>
              </motion.a>
            )}
          </AnimatePresence>

          {/* Email Button */}
          <AnimatePresence>
            {isExpanded && (
              <motion.a
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0, y: 20 }}
                transition={{ delay: 0.05 }}
                href="mailto:techarenagroupe@gmail.com"
                onClick={handleEmail}
                className="w-14 h-14 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-colors flex items-center justify-center group relative"
                aria-label="Send Email"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiMail className="w-6 h-6" />
                <span className="absolute right-full mr-3 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Email Us
                </span>
              </motion.a>
            )}
          </AnimatePresence>

          {/* Scroll to Top / Toggle Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (isExpanded) {
                scrollToTop()
              } else {
                setIsExpanded(true)
              }
            }}
            className={`w-14 h-14 rounded-full shadow-lg transition-colors flex items-center justify-center ${
              isExpanded
                ? 'bg-gray-700 hover:bg-gray-800 text-white'
                : 'bg-primary-600 hover:bg-primary-700 text-white'
            }`}
            aria-label={isExpanded ? 'Scroll to top' : 'Show contact options'}
          >
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FiArrowUp className="w-6 h-6" />
            </motion.div>
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  )
}

export default ScrollToTop

