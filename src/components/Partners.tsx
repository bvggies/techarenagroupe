import { motion } from 'framer-motion'
import { FiBriefcase } from 'react-icons/fi'

const partners = [
  { name: 'Eventa Ghana', logo: '🎉' },
  { name: 'FitTrack', logo: '✂️' },
  { name: 'Lodgex CRM', logo: '🏢' },
  { name: 'DaSDA Africa', logo: '🌍' },
  { name: 'SmartBite', logo: '🍳' },
  { name: 'Xstream', logo: '⚽' },
]

const Partners = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4">
            <FiBriefcase className="w-12 h-12 text-primary-600 dark:text-primary-400 mx-auto" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Trusted Partners</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We're proud to work with amazing clients and partners
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
              whileHover={{ scale: 1.1, y: -5 }}
              style={{ willChange: 'transform, opacity' }}
              className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="text-5xl mb-3">{partner.logo}</div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
                {partner.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Partners

