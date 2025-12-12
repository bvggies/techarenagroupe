import { motion } from 'framer-motion'
import { FiZap, FiUsers, FiShield, FiMessageCircle, FiDollarSign } from 'react-icons/fi'
import StaggerChildren from './StaggerChildren'

const reasons = [
  {
    icon: FiZap,
    title: 'Innovative Solutions',
    emoji: '🚀',
    description: 'Cutting-edge technology and creative approaches to solve your business challenges.',
  },
  {
    icon: FiUsers,
    title: 'Skilled Development Team',
    emoji: '💻',
    description: 'Experienced developers passionate about creating exceptional digital experiences.',
  },
  {
    icon: FiShield,
    title: 'Secure & Reliable Systems',
    emoji: '🔒',
    description: 'Enterprise-grade security and reliability you can trust for your business.',
  },
  {
    icon: FiMessageCircle,
    title: 'Dedicated Support',
    emoji: '💬',
    description: 'Ongoing support and maintenance to ensure your systems run smoothly.',
  },
  {
    icon: FiDollarSign,
    title: 'Affordable Packages',
    emoji: '✨',
    description: 'Competitive pricing with flexible packages to fit your budget and needs.',
  },
]

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Why Choose Us?</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We combine expertise, innovation, and dedication to deliver exceptional results
          </p>
        </motion.div>

        <StaggerChildren staggerDelay={0.1} direction="up" distance={30}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {reasons.map((reason) => (
              <motion.div
                key={reason.title}
                whileHover={{ y: -10, rotateY: 5 }}
                className="group relative"
              >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition-opacity duration-300" />
              <div className="relative h-full p-6 bg-gradient-to-br from-white to-primary-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 text-center">
                <motion.div
                  className="text-4xl md:text-5xl mb-4"
                  animate={{ 
                    rotate: typeof window !== 'undefined' && window.innerWidth < 768 
                      ? 0 
                      : [0, 10, -10, 0] 
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  {reason.emoji}
                </motion.div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{reason.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{reason.description}</p>
              </div>
            </motion.div>
          ))}
          </div>
        </StaggerChildren>
      </div>
    </section>
  )
}

export default WhyChooseUs

