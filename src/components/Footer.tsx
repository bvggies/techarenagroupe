import { motion } from 'framer-motion'
import { FiMail, FiPhone } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import SocialLinks from './SocialLinks'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          const windowHeight = window.innerHeight
          const documentHeight = document.documentElement.scrollHeight
          
          // Check if we're near the bottom of the page
          const isNearBottom = currentScrollY + windowHeight >= documentHeight - 100
          
          if (isNearBottom) {
            // Determine scroll direction
            if (currentScrollY > lastScrollY) {
              setScrollDirection('down')
            } else if (currentScrollY < lastScrollY) {
              setScrollDirection('up')
            }
          } else {
            setScrollDirection('up')
          }
          
          setLastScrollY(currentScrollY)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <footer className="relative bg-gray-900 dark:bg-black text-gray-300 dark:text-gray-400 py-12 overflow-hidden">
      {/* Animated Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-primary-600/20 via-primary-500/10 to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: scrollDirection === 'down' ? 1 : 0,
        }}
        transition={{ 
          duration: 0.5,
          ease: 'easeInOut'
        }}
      />
      
      {/* Additional Glow Effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary-500/30 via-primary-400/20 to-transparent pointer-events-none"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ 
          opacity: scrollDirection === 'down' ? 1 : 0,
          scaleY: scrollDirection === 'down' ? 1 : 0,
        }}
        transition={{ 
          duration: 0.6,
          ease: 'easeOut'
        }}
        style={{ transformOrigin: 'bottom' }}
      />
      
      <div className="relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/assets/logo.png"
                alt="TechArena Groupe Logo"
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-white dark:text-gray-100">TechArena Groupe</span>
            </div>
            <p className="text-gray-400">
              Building innovative tech solutions for your business. 
              We create responsive websites, mobile apps, and custom software that drives results.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-white dark:text-gray-100 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-primary-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-primary-400 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-primary-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-primary-400 transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-white dark:text-gray-100 font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <FiPhone className="w-5 h-5 text-primary-400" />
                <a href="tel:+233549805296" className="hover:text-primary-400 transition-colors">
                  +233 549805296
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <FiMail className="w-5 h-5 text-primary-400" />
                <a href="mailto:techarenagroupe@gmail.com" className="hover:text-primary-400 transition-colors">
                  techarenagroupe@gmail.com
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

          <div className="border-t border-gray-800 dark:border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-400 dark:text-gray-500 text-center md:text-left">
                © {currentYear} TechArena Groupe. All rights reserved.
              </p>
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

