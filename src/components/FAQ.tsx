import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown, FiHelpCircle } from 'react-icons/fi'

const faqs = [
  {
    question: 'How long does it take to complete a project?',
    answer: 'Project timelines vary based on complexity. A simple website typically takes 2-4 weeks, while complex applications can take 2-6 months. We provide detailed timelines during our initial consultation.',
  },
  {
    question: 'Do you provide ongoing support and maintenance?',
    answer: 'Yes! We offer comprehensive hosting and maintenance support packages. This includes regular updates, security patches, backups, and technical support to keep your application running smoothly.',
  },
  {
    question: 'What technologies do you use?',
    answer: 'We use modern, industry-standard technologies including React, Node.js, React Native, PostgreSQL, TypeScript, and more. We choose the best stack for each project based on requirements.',
  },
  {
    question: 'Can you work with our existing systems?',
    answer: 'Absolutely! We specialize in integrating with existing systems and can work with your current infrastructure, APIs, and databases to create seamless solutions.',
  },
  {
    question: 'What is your pricing structure?',
    answer: 'We offer flexible pricing packages starting from GHS 2,500. Pricing depends on project scope, complexity, and requirements. Contact us for a custom quote tailored to your needs.',
  },
  {
    question: 'Do you provide mobile app development?',
    answer: 'Yes! We develop native and cross-platform mobile applications for both iOS and Android using React Native and Expo, ensuring a consistent experience across all devices.',
  },
]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4">
            <FiHelpCircle className="w-12 h-12 text-primary-600 dark:text-primary-400 mx-auto" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Frequently Asked Questions</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to know about our services
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="font-semibold text-gray-800 dark:text-white pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiChevronDown className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ

