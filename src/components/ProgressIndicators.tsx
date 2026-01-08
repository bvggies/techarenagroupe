import { motion } from 'framer-motion'
import { FiCheckCircle, FiAward, FiTrendingUp } from 'react-icons/fi'

interface ProjectProgressProps {
  projectName: string
  progress: number
  status: 'planning' | 'development' | 'testing' | 'deployment' | 'completed'
  deadline?: string
}

const ProjectProgress = ({ projectName, progress, status, deadline }: ProjectProgressProps) => {
  const statusColors = {
    planning: 'bg-blue-500',
    development: 'bg-yellow-500',
    testing: 'bg-purple-500',
    deployment: 'bg-orange-500',
    completed: 'bg-green-500',
  }

  const statusLabels = {
    planning: 'Planning',
    development: 'Development',
    testing: 'Testing',
    deployment: 'Deployment',
    completed: 'Completed',
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{projectName}</h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${statusColors[status]}`}
        >
          {statusLabels[status]}
        </span>
      </div>
      <div className="mb-2">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-gray-600 dark:text-gray-400">Progress</span>
          <span className="font-semibold text-gray-900 dark:text-white">{progress}%</span>
        </div>
        <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`h-full ${statusColors[status]} rounded-full`}
          />
        </div>
      </div>
      {deadline && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Deadline: {deadline}</p>
      )}
    </div>
  )
}

interface SkillLevelProps {
  skill: string
  level: number
  icon?: React.ReactNode
}

const SkillLevel = ({ skill, level, icon }: SkillLevelProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {icon && <div className="text-primary-600 dark:text-primary-400">{icon}</div>}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{skill}</h3>
        </div>
        <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">{level}%</span>
      </div>
      <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
        />
      </div>
      <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
        <span>Beginner</span>
        <span>Expert</span>
      </div>
    </div>
  )
}

interface AchievementBadgeProps {
  title: string
  description: string
  icon: React.ReactNode
  unlocked: boolean
  progress?: number
}

const AchievementBadge = ({ title, description, icon, unlocked, progress }: AchievementBadgeProps) => {
  return (
    <motion.div
      className={`relative rounded-xl p-6 shadow-lg overflow-hidden ${
        unlocked
          ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white'
          : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
      }`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {!unlocked && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
          <div className="text-4xl">🔒</div>
        </div>
      )}
      <div className="relative z-10">
        <div className="text-4xl mb-3">{icon}</div>
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm opacity-90">{description}</p>
        {!unlocked && progress !== undefined && (
          <div className="mt-3">
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-white rounded-full"
              />
            </div>
            <p className="text-xs mt-1">{progress}% complete</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

const ProgressIndicators = () => {
  const projects = [
    { name: 'E-Commerce Platform', progress: 75, status: 'testing' as const, deadline: '2024-02-15' },
    { name: 'Mobile App', progress: 45, status: 'development' as const, deadline: '2024-03-01' },
    { name: 'Dashboard Redesign', progress: 90, status: 'deployment' as const, deadline: '2024-02-10' },
  ]

  const skills = [
    { name: 'React', level: 95 },
    { name: 'TypeScript', level: 88 },
    { name: 'Node.js', level: 82 },
    { name: 'UI/UX Design', level: 75 },
  ]

  const achievements = [
    {
      title: 'First Project',
      description: 'Completed your first project',
      icon: <FiAward />,
      unlocked: true,
    },
    {
      title: 'Speed Demon',
      description: 'Delivered 10 projects on time',
      icon: <FiTrendingUp />,
      unlocked: true,
    },
    {
      title: 'Perfectionist',
      description: 'Achieve 100% client satisfaction',
      icon: <FiCheckCircle />,
      unlocked: false,
      progress: 85,
    },
    {
      title: 'Team Player',
      description: 'Collaborate on 50 projects',
      icon: <FiAward />,
      unlocked: false,
      progress: 60,
    },
  ]

  return (
    <section id="progress" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Progress & Achievements</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Track our projects, skills, and achievements
          </p>
        </motion.div>

        {/* Project Progress */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Active Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectProgress projectName={project.name} progress={project.progress} status={project.status} deadline={project.deadline} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skill Levels */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Our Expertise</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SkillLevel skill={skill.name} level={skill.level} icon={<FiTrendingUp />} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievement Badges */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-center">Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AchievementBadge {...achievement} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { ProjectProgress, SkillLevel, AchievementBadge }
export default ProgressIndicators
