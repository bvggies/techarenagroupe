import { motion } from 'framer-motion'
import { FiTarget, FiUsers, FiAward, FiTrendingUp } from 'react-icons/fi'
import AnimatedCounter from './AnimatedCounter'

const stats = [
  { icon: FiTarget, value: '50+', label: 'Projects Completed', color: 'from-blue-500 to-cyan-500' },
  { icon: FiUsers, value: '30+', label: 'Happy Clients', color: 'from-purple-500 to-pink-500' },
  { icon: FiAward, value: '5+', label: 'Years Experience', color: 'from-green-500 to-emerald-500' },
  { icon: FiTrendingUp, value: '100%', label: 'Client Satisfaction', color: 'from-orange-500 to-red-500' },
]

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">About TechArena Groupe</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              We are a dynamic tech startup dedicated to transforming businesses through innovative 
              digital solutions. With a passion for technology and a commitment to excellence, we 
              help companies of all sizes achieve their digital goals.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Our team of skilled developers, designers, and consultants work together to deliver 
              cutting-edge solutions that drive growth, enhance user experiences, and streamline 
              business operations.
            </p>
            <div className="space-y-4">
              <motion.div
                className="flex items-start space-x-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2" />
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Innovation First</h3>
                  <p className="text-gray-600 dark:text-gray-300">We stay ahead of the curve with the latest technologies and best practices.</p>
                </div>
              </motion.div>
              <motion.div
                className="flex items-start space-x-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2" />
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Client-Centric Approach</h3>
                  <p className="text-gray-600 dark:text-gray-300">Your success is our priority. We work closely with you every step of the way.</p>
                </div>
              </motion.div>
              <motion.div
                className="flex items-start space-x-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2" />
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Quality Assurance</h3>
                  <p className="text-gray-600 dark:text-gray-300">We deliver robust, scalable, and maintainable solutions that stand the test of time.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
                    <AnimatedCounter value={parseInt(stat.value.replace(/\D/g, ''))} suffix={stat.value.includes('%') ? '%' : '+'} />
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About

