import { motion } from 'framer-motion'
import {
  FiGlobe,
  FiShoppingCart,
  FiSmartphone,
  FiCalendar,
  FiUsers,
  FiDatabase,
  FiLayers,
  FiCode,
  FiImage,
  FiMusic,
  FiTrendingUp,
  FiShare2,
  FiMessageSquare,
} from 'react-icons/fi'

const services = [
  {
    icon: FiGlobe,
    title: 'Responsive Business Websites',
    description: 'Modern, mobile-first websites that look great on all devices and drive conversions.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: FiShoppingCart,
    title: 'E-commerce & Online Store Platforms',
    description: 'Complete online stores with payment integration, inventory management, and more.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: FiSmartphone,
    title: 'Mobile Apps (iOS & Android)',
    description: 'Native and cross-platform mobile applications built with React Native and Expo.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: FiCalendar,
    title: 'Booking & Reservation Systems',
    description: 'Streamlined booking systems for appointments, events, and reservations.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: FiUsers,
    title: 'School/Church/Organization Portals',
    description: 'Custom portals for managing members, events, and communications.',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    icon: FiDatabase,
    title: 'CRM & Management Systems',
    description: 'Comprehensive customer relationship management and business operations systems.',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    icon: FiLayers,
    title: 'UI/UX Design & Branding',
    description: 'Beautiful, intuitive designs that enhance user experience and brand identity.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: FiCode,
    title: 'Custom Software Solutions',
    description: 'Tailored software solutions designed specifically for your business needs.',
    color: 'from-amber-500 to-yellow-500',
  },
  {
    icon: FiImage,
    title: 'Graphic Designs',
    description: 'Creative and professional graphic design services for branding, marketing materials, and digital assets.',
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: FiMusic,
    title: 'Music Distribution',
    description: 'Get your music on all major streaming platforms and reach audiences worldwide.',
    color: 'from-red-500 to-pink-500',
  },
  {
    icon: FiTrendingUp,
    title: 'SEO Optimization/Management',
    description: 'Boost your online visibility and rankings with expert SEO strategies and ongoing management.',
    color: 'from-emerald-500 to-green-500',
  },
  {
    icon: FiShare2,
    title: 'Social Media Management',
    description: 'Comprehensive social media management to grow your brand and engage with your audience.',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    icon: FiMessageSquare,
    title: 'Tech Consultations',
    description: 'Expert technology consulting to help you make informed decisions and optimize your tech stack.',
    color: 'from-cyan-500 to-blue-500',
  },
]

const Services = () => {
  return (
    <section id="services" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">We Build</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Comprehensive tech solutions tailored to your business needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl blur-xl" />
              <div className="relative h-full p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group">
                <motion.div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-500/0 group-hover:from-primary-500/5 group-hover:to-primary-500/10 rounded-2xl transition-all duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services

