import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowUp, FiMail, FiMessageCircle } from 'react-icons/fi'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault()
    window.open('https://wa.me/233549805296', '_blank')
  }

  const handleEmail = (e: React.MouseEvent) => {
    e.preventDefault()
    window.location.href = 'mailto:techarenagroupe@gmail.com'
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
          {/* WhatsApp Button - Always Visible */}
          <motion.a
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            transition={{ delay: 0.1 }}
            href="https://wa.me/233549805296"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsApp}
            className="w-12 h-12 md:w-14 md:h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center group relative"
            aria-label="Contact via WhatsApp"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiMessageCircle className="w-5 h-5 md:w-6 md:h-6" />
            <span className="absolute right-full mr-3 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block">
              WhatsApp Us
            </span>
          </motion.a>

          {/* Email Button - Always Visible */}
          <motion.a
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            transition={{ delay: 0.05 }}
            href="mailto:techarenagroupe@gmail.com"
            onClick={handleEmail}
            className="w-12 h-12 md:w-14 md:h-14 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-colors flex items-center justify-center group relative"
            aria-label="Send Email"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiMail className="w-5 h-5 md:w-6 md:h-6" />
            <span className="absolute right-full mr-3 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block">
              Email Us
            </span>
          </motion.a>

          {/* Scroll to Top Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="w-12 h-12 md:w-14 md:h-14 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors flex items-center justify-center"
            aria-label="Scroll to top"
          >
            <FiArrowUp className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  )
}

export default ScrollToTop

