import { motion } from 'framer-motion'
import { FiCheck, FiX } from 'react-icons/fi'
import Ripple from './Ripple'

const packages = [
  {
    name: 'Starter',
    price: 'GHS 2,500',
    description: 'Perfect for small businesses getting started',
    features: [
      'Responsive Website (5 pages)',
      'Basic SEO Setup',
      'Contact Form',
      'Social Media Integration',
      '1 Month Support',
      'Mobile Responsive',
    ],
    notIncluded: ['E-commerce', 'Custom Features', 'Advanced Analytics'],
    popular: false,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Professional',
    price: 'GHS 5,000',
    description: 'Ideal for growing businesses',
    features: [
      'Responsive Website (10 pages)',
      'Advanced SEO Optimization',
      'E-commerce Integration',
      'Admin Dashboard',
      'Payment Gateway',
      '3 Months Support',
      'Analytics Setup',
      'Custom Features',
    ],
    notIncluded: ['Mobile App', 'Enterprise Features'],
    popular: true,
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Tailored solutions for large organizations',
    features: [
      'Unlimited Pages',
      'Custom Web Application',
      'Mobile App (iOS & Android)',
      'CRM Integration',
      'Advanced Analytics',
      'Priority Support',
      'Dedicated Team',
      'Custom Development',
      'Training & Documentation',
    ],
    notIncluded: [],
    popular: false,
    color: 'from-orange-500 to-red-500',
  },
]

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Our Packages</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect package for your business needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`relative ${
                pkg.popular
                  ? 'md:-mt-4 md:mb-4 border-2 border-primary-500 shadow-2xl'
                  : 'border border-gray-200 dark:border-gray-700 shadow-lg'
              } bg-white dark:bg-gray-800 rounded-2xl overflow-hidden`}
            >
              {pkg.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary-600 to-primary-400 text-white text-center py-2 text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <div className={`p-8 ${pkg.popular ? 'pt-12' : ''}`}>
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${pkg.color} flex items-center justify-center mb-4`}>
                  <span className="text-2xl font-bold text-white">{pkg.name[0]}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{pkg.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{pkg.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-800 dark:text-white">{pkg.price}</span>
                  {pkg.price !== 'Custom' && <span className="text-gray-600 dark:text-gray-300">/project</span>}
                </div>

                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <FiCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                  {pkg.notIncluded.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3 opacity-50">
                      <FiX className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-500 dark:text-gray-500 line-through">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Ripple color={pkg.popular ? 'rgba(255, 255, 255, 0.6)' : 'rgba(14, 165, 233, 0.3)'}>
                  <motion.a
                    href="#contact"
                    className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-colors relative overflow-hidden ${
                      pkg.popular
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started
                  </motion.a>
                </Ripple>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Need a custom solution? We're here to help!
          </p>
          <motion.a
            href="#contact"
            className="inline-block px-8 py-3 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Us for Custom Quote
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Pricing

