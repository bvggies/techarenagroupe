import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSmartphone, FiGlobe, FiDatabase, FiLayers, FiMonitor, FiEye, FiSearch, FiX } from 'react-icons/fi'
import { projects, Project } from '../data/projects'
import ProjectModal from './ProjectModal'
import ImageLightbox from './ImageLightbox'
import Tooltip from './Tooltip'
import Ripple from './Ripple'

const categoryIcons = {
  'mobile app': FiSmartphone,
  'web app': FiGlobe,
  'management system': FiDatabase,
  'website': FiMonitor,
  'portal': FiLayers,
}

const categoryColors = {
  'mobile app': 'from-purple-500 to-pink-500',
  'web app': 'from-blue-500 to-cyan-500',
  'management system': 'from-green-500 to-emerald-500',
  'website': 'from-orange-500 to-red-500',
  'portal': 'from-indigo-500 to-blue-500',
}

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))]

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
    const matchesSearch = searchQuery === '' || 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  // Auto-slide for featured projects - slower on mobile for better performance
  useEffect(() => {
    if (filteredProjects.length > 0) {
      const isMobile = window.innerWidth < 768
      const interval = isMobile ? 6000 : 4000 // Slower on mobile
      const timer = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % Math.min(filteredProjects.length, 6))
      }, interval)
      return () => clearInterval(timer as any)
    }
  }, [filteredProjects.length])

  const featuredProjects = filteredProjects.slice(0, 6)

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Our Projects</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Showcasing our expertise across various industries and technologies
          </p>
        </motion.div>

        {/* Search and Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-6">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-800 dark:text-white placeholder-gray-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <FiX className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Ripple 
                key={category}
                color={selectedCategory === category ? 'rgba(255, 255, 255, 0.6)' : 'rgba(14, 165, 233, 0.2)'}
              >
                <motion.button
                  onClick={() => {
                    setSelectedCategory(category)
                    setCurrentSlide(0)
                  }}
                  className={`px-6 py-2 rounded-full font-semibold transition-all relative overflow-hidden ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category === 'all' ? 'All Projects' : category.replace(/\b\w/g, l => l.toUpperCase())}
                </motion.button>
              </Ripple>
            ))}
          </div>
        </motion.div>

        {/* Featured Projects Slideshow */}
        <div className="mb-12">
          <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-200 dark:ring-gray-700">
            <AnimatePresence mode="wait">
              {featuredProjects.map((project, index) => {
                if (index !== currentSlide) return null
                const Icon = categoryIcons[project.category]
                const colorClass = categoryColors[project.category]

                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <div className="relative h-full bg-gradient-to-br from-gray-900 to-gray-800">
                      {/* Project Image */}
                      <div className="absolute inset-0">
                        <img
                          src={project.screenshot}
                          alt={project.name}
                          className={`w-full h-full object-cover ${
                            project.category === 'mobile app' ? 'object-contain' : 'object-cover'
                          }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      </div>

                      {/* Project Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                        <motion.div
                          initial={{ y: 50, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="max-w-3xl"
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClass} flex items-center justify-center`}>
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <span className="px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-semibold">
                              {project.category.replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                          </div>
                          <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                            {project.name}
                          </h3>
                          <p className="text-gray-200 text-lg mb-4">{project.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
              {featuredProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
            >
              ←
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % featuredProjects.length)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
            >
              →
            </button>
          </div>
        </div>

        {/* All Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            const Icon = categoryIcons[project.category]
            const colorClass = categoryColors[project.category]

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                style={{ willChange: 'transform, opacity' }}
                onClick={() => {
                  setSelectedProject(project)
                  setIsModalOpen(true)
                }}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={project.screenshot}
                    alt={project.name}
                    loading="lazy"
                    decoding="async"
                    className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                      project.category === 'mobile app' ? 'object-contain p-4' : 'object-cover'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorClass} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* View Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Tooltip content="Click to view project details">
                      <div className="px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg flex items-center space-x-2 text-gray-800 dark:text-white font-semibold">
                        <FiEye className="w-5 h-5" />
                        <span>View Details</span>
                      </div>
                    </Tooltip>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white line-clamp-1">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-primary-50 text-primary-700 rounded text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No projects found matching your search criteria.
            </p>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <ImageLightbox
        images={filteredProjects.map(p => p.screenshot)}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setLightboxIndex((prev) => (prev + 1) % filteredProjects.length)}
        onPrev={() => setLightboxIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length)}
      />
    </section>
  )
}

export default Projects

