import { motion } from 'framer-motion'
import { FiGithub, FiMail, FiPhone } from 'react-icons/fi'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
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
              <span className="text-xl font-bold text-white">TechArena Groupe</span>
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
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
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
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
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

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} TechArena Groupe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

