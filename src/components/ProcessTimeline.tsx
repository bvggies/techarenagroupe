import { motion } from 'framer-motion'
import { FiSearch, FiMessageSquare, FiCode, FiCheckCircle } from 'react-icons/fi'

const steps = [
  {
    icon: FiSearch,
    title: 'Discovery & Planning',
    description: 'We understand your requirements, goals, and target audience to create a comprehensive project plan.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: FiMessageSquare,
    title: 'Design & Prototyping',
    description: 'Our team creates wireframes and prototypes, ensuring the design aligns with your vision and user needs.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: FiCode,
    title: 'Development & Testing',
    description: 'We build your solution using best practices, with continuous testing to ensure quality and performance.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: FiCheckCircle,
    title: 'Launch & Support',
    description: 'We deploy your project and provide ongoing support, maintenance, and updates to keep it running smoothly.',
    color: 'from-orange-500 to-red-500',
  },
]

const ProcessTimeline = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Our Process</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A streamlined approach to delivering exceptional results
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-primary-600 transform md:-translate-x-1/2" />

            {/* Steps */}
            <div className="space-y-12">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isEven = index % 2 === 0

                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className={`relative flex items-center ${
                      isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Content Card */}
                    <div className={`flex-1 ${isEven ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'} ${!isEven ? 'md:order-2' : ''}`}>
                      <motion.div
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
                      >
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} mb-4 ${isEven ? 'md:ml-auto' : ''}`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {step.description}
                        </p>
                      </motion.div>
                    </div>

                    {/* Timeline Dot */}
                    <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 md:-translate-x-1/2 z-10">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-900`}>
                        <span className="text-white font-bold text-lg">{index + 1}</span>
                      </div>
                    </div>

                    {/* Spacer for mobile */}
                    <div className="flex-1 md:hidden" />
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProcessTimeline

