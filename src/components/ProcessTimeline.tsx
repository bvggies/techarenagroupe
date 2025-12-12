import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiSearch, FiMessageSquare, FiCode, FiCheckCircle, FiArrowRight, FiZap } from 'react-icons/fi'
import Ripple from './Ripple'

const steps = [
  {
    icon: FiSearch,
    title: 'Discovery & Planning',
    description: 'We understand your requirements, goals, and target audience to create a comprehensive project plan that aligns with your vision.',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    features: ['Requirements Analysis', 'User Research', 'Project Roadmap'],
  },
  {
    icon: FiMessageSquare,
    title: 'Design & Prototyping',
    description: 'Our team creates wireframes and prototypes, ensuring the design aligns with your vision and provides an exceptional user experience.',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-200 dark:border-purple-800',
    features: ['UI/UX Design', 'Interactive Prototypes', 'Design System'],
  },
  {
    icon: FiCode,
    title: 'Development & Testing',
    description: 'We build your solution using best practices, with continuous testing to ensure quality, performance, and scalability.',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800',
    features: ['Agile Development', 'Quality Assurance', 'Performance Optimization'],
  },
  {
    icon: FiCheckCircle,
    title: 'Launch & Support',
    description: 'We deploy your project and provide ongoing support, maintenance, and updates to keep it running smoothly and efficiently.',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    borderColor: 'border-orange-200 dark:border-orange-800',
    features: ['Deployment', 'Monitoring', '24/7 Support'],
  },
]

const ProcessTimeline = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-primary-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-primary-900/10 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/20 dark:bg-primary-800/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 dark:bg-purple-800/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-block mb-4"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg">
              <FiZap className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Our Process</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A streamlined, transparent approach to delivering exceptional results
          </p>
        </motion.div>

        <div ref={ref} className="max-w-7xl mx-auto">
          {/* Desktop Timeline */}
          <div className="hidden lg:block relative">
            {/* Animated Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-400 via-primary-500 to-primary-600 transform -translate-x-1/2">
              <motion.div
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="absolute inset-0 bg-gradient-to-b from-primary-500 to-primary-600 origin-top"
              />
            </div>

            {/* Steps */}
            <div className="space-y-24">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isEven = index % 2 === 0

                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -100 : 100 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    className={`relative flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    {/* Content Card */}
                    <div className={`flex-1 ${isEven ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                      <motion.div
                        whileHover={{ scale: 1.02, y: -5 }}
                        className={`relative ${step.bgColor} ${step.borderColor} border-2 rounded-3xl p-8 shadow-xl overflow-hidden group`}
                      >
                        {/* Gradient Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                        
                        {/* Content */}
                        <div className="relative z-10">
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                            transition={{ delay: index * 0.2 + 0.3, type: 'spring', stiffness: 200 }}
                            className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} mb-6 ${isEven ? 'ml-auto' : 'mr-auto'} shadow-lg`}
                          >
                            <Icon className="w-8 h-8 text-white" />
                          </motion.div>
                          
                          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                            {step.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                            {step.description}
                          </p>
                          
                          {/* Features List */}
                          <div className={`flex flex-wrap gap-2 ${isEven ? 'justify-end' : 'justify-start'}`}>
                            {step.features.map((feature, idx) => (
                              <motion.span
                                key={feature}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                transition={{ delay: index * 0.2 + 0.4 + idx * 0.1 }}
                                className={`px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 shadow-md border border-gray-200 dark:border-gray-700`}
                              >
                                {feature}
                              </motion.span>
                            ))}
                          </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl" />
                        <div className="absolute bottom-4 left-4 w-32 h-32 bg-gradient-to-tr from-white/20 to-transparent rounded-full blur-2xl" />
                      </motion.div>
                    </div>

                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : { scale: 0 }}
                        transition={{ delay: index * 0.2 + 0.2, type: 'spring', stiffness: 200 }}
                        className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-2xl border-4 border-white dark:border-gray-900`}
                      >
                        <span className="text-white font-bold text-xl">{index + 1}</span>
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                          className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color} opacity-30`}
                        />
                      </motion.div>
                    </div>

                    {/* Spacer */}
                    <div className="flex-1" />
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Mobile/Tablet Timeline */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative"
                >
                  {/* Timeline Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-primary-400 to-primary-600" />
                  )}

                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className={`relative ${step.bgColor} ${step.borderColor} border-2 rounded-3xl p-6 shadow-xl ml-12 overflow-hidden group`}
                  >
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    
                    {/* Timeline Dot */}
                    <div className="absolute -left-12 top-6">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + 0.2, type: 'spring', stiffness: 200 }}
                        className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-900`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                          className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color} opacity-30`}
                        />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        {step.description}
                      </p>
                      
                      {/* Features List */}
                      <div className="flex flex-wrap gap-2">
                        {step.features.map((feature) => (
                          <span
                            key={feature}
                            className="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 shadow-md border border-gray-200 dark:border-gray-700"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl" />
                    <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-tr from-white/20 to-transparent rounded-full blur-2xl" />
                  </motion.div>
                </motion.div>
              )
            })}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-20 text-center"
          >
            <Ripple color="rgba(255, 255, 255, 0.6)">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer relative overflow-hidden"
              >
                <span className="font-semibold text-lg">Ready to Start Your Project?</span>
                <FiArrowRight className="w-5 h-5" />
              </motion.div>
            </Ripple>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ProcessTimeline
