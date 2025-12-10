import { motion } from 'framer-motion'
import {
  FiCheckCircle,
  FiZap,
  FiShield,
  FiSearch,
  FiSettings,
  FiCreditCard,
  FiServer,
  FiClock,
} from 'react-icons/fi'

const features = [
  {
    icon: FiCheckCircle,
    title: 'Professional, clean & modern UI',
    description: 'Beautiful interfaces that engage users and reflect your brand.',
  },
  {
    icon: FiZap,
    title: 'Fast & secure applications',
    description: 'Optimized performance and enterprise-grade security.',
  },
  {
    icon: FiSearch,
    title: 'SEO optimized websites',
    description: 'Built for search engines to maximize your online visibility.',
  },
  {
    icon: FiSettings,
    title: 'Admin dashboard for full control',
    description: 'Comprehensive admin panels to manage your content and data.',
  },
  {
    icon: FiCreditCard,
    title: 'Payment integration',
    description: 'Seamless payment processing with multiple gateway options.',
  },
  {
    icon: FiServer,
    title: 'Hosting & maintenance support',
    description: 'Reliable hosting and ongoing maintenance to keep you running.',
  },
  {
    icon: FiClock,
    title: 'Delivery on time',
    description: 'We respect deadlines and deliver quality work on schedule.',
  },
  {
    icon: FiShield,
    title: 'Secure & reliable',
    description: 'Your data and applications are protected with best practices.',
  },
]

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">What You Get</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need for a successful digital presence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <motion.div
                className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <feature.icon className="w-6 h-6 text-primary-600" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features

