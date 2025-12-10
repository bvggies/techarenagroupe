import { motion } from 'framer-motion'
import { FiFacebook, FiTwitter, FiLinkedin, FiInstagram, FiGithub, FiYoutube } from 'react-icons/fi'

const socialLinks = [
  { icon: FiFacebook, href: '#', label: 'Facebook', color: 'hover:text-blue-600' },
  { icon: FiTwitter, href: '#', label: 'Twitter', color: 'hover:text-blue-400' },
  { icon: FiLinkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-700' },
  { icon: FiInstagram, href: '#', label: 'Instagram', color: 'hover:text-pink-600' },
  { icon: FiGithub, href: '#', label: 'GitHub', color: 'hover:text-gray-800 dark:hover:text-gray-200' },
  { icon: FiYoutube, href: '#', label: 'YouTube', color: 'hover:text-red-600' },
]

const SocialLinks = () => {
  return (
    <div className="flex items-center justify-center space-x-4">
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 ${social.color} transition-colors shadow-lg hover:shadow-xl`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.9 }}
          aria-label={social.label}
        >
          <social.icon className="w-5 h-5" />
        </motion.a>
      ))}
    </div>
  )
}

export default SocialLinks

