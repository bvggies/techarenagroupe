import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCircle, FiCheckCircle, FiClock, FiUsers, FiActivity } from 'react-icons/fi'

interface TeamMember {
  id: string
  name: string
  role: string
  status: 'online' | 'away' | 'busy' | 'offline'
  currentTask?: string
}

interface ProjectStatus {
  id: string
  name: string
  status: 'on-track' | 'at-risk' | 'delayed' | 'completed'
  progress: number
  lastUpdate: string
}

const LiveStatusIndicators = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'John Doe',
      role: 'Lead Developer',
      status: 'online',
      currentTask: 'Working on API integration',
    },
    {
      id: '2',
      name: 'Jane Smith',
      role: 'UI/UX Designer',
      status: 'online',
      currentTask: 'Designing new dashboard',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      role: 'Project Manager',
      status: 'away',
      currentTask: 'In a meeting',
    },
    {
      id: '4',
      name: 'Sarah Williams',
      role: 'Backend Developer',
      status: 'busy',
      currentTask: 'Debugging production issue',
    },
  ])

  const [projects, setProjects] = useState<ProjectStatus[]>([
    {
      id: '1',
      name: 'E-Commerce Platform',
      status: 'on-track',
      progress: 75,
      lastUpdate: '2 minutes ago',
    },
    {
      id: '2',
      name: 'Mobile App',
      status: 'at-risk',
      progress: 45,
      lastUpdate: '5 minutes ago',
    },
    {
      id: '3',
      name: 'Dashboard Redesign',
      status: 'on-track',
      progress: 90,
      lastUpdate: '1 minute ago',
    },
  ])

  const [notifications, setNotifications] = useState<
    Array<{ id: string; message: string; type: 'info' | 'success' | 'warning' | 'error'; time: string }>
  >([])

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      // Simulate status changes
      setTeamMembers((prev) =>
        prev.map((member) => {
          if (Math.random() > 0.7) {
            const statuses: TeamMember['status'][] = ['online', 'away', 'busy', 'offline']
            return {
              ...member,
              status: statuses[Math.floor(Math.random() * statuses.length)],
            }
          }
          return member
        })
      )

      // Simulate project updates
      setProjects((prev) =>
        prev.map((project) => {
          if (Math.random() > 0.8 && project.progress < 100) {
            const newProgress = Math.min(project.progress + Math.random() * 2, 100)
            return {
              ...project,
              progress: Math.round(newProgress),
              lastUpdate: 'Just now',
            }
          }
          return project
        })
      )

      // Simulate notifications
      if (Math.random() > 0.9) {
        const notificationTypes: Array<'info' | 'success' | 'warning' | 'error'> = [
          'info',
          'success',
          'warning',
          'error',
        ]
        const messages = [
          'New task assigned',
          'Project milestone reached',
          'Team member status changed',
          'Code review completed',
        ]
        const newNotification = {
          id: Date.now().toString(),
          message: messages[Math.floor(Math.random() * messages.length)],
          type: notificationTypes[Math.floor(Math.random() * notificationTypes.length)],
          time: new Date().toLocaleTimeString(),
        }
        setNotifications((prev) => [newNotification, ...prev].slice(0, 5))
      }
    }, 5000)

    return () => clearInterval(interval as any)
  }, [])

  const getStatusColor = (status: TeamMember['status']) => {
    switch (status) {
      case 'online':
        return 'bg-green-500'
      case 'away':
        return 'bg-yellow-500'
      case 'busy':
        return 'bg-red-500'
      case 'offline':
        return 'bg-gray-400'
      default:
        return 'bg-gray-400'
    }
  }

  const getProjectStatusColor = (status: ProjectStatus['status']) => {
    switch (status) {
      case 'on-track':
        return 'bg-green-500'
      case 'at-risk':
        return 'bg-yellow-500'
      case 'delayed':
        return 'bg-red-500'
      case 'completed':
        return 'bg-blue-500'
      default:
        return 'bg-gray-400'
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500'
      case 'warning':
        return 'bg-yellow-500'
      case 'error':
        return 'bg-red-500'
      default:
        return 'bg-blue-500'
    }
  }

  return (
    <section id="live-status" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <FiActivity className="text-primary-600 dark:text-primary-400 animate-pulse" size={32} />
            <h2 className="text-4xl md:text-5xl font-bold">Live Status</h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Real-time updates on team availability and project progress
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Team Availability */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center space-x-2 mb-6">
              <FiUsers className="text-primary-600 dark:text-primary-400" size={24} />
              <h3 className="text-2xl font-bold">Team Availability</h3>
            </div>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg"
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 dark:text-primary-400 font-semibold">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                    <div
                      className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor(
                        member.status
                      )} rounded-full border-2 border-white dark:border-gray-800`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white">{member.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
                    {member.currentTask && (
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {member.currentTask}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Project Status */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center space-x-2 mb-6">
              <FiActivity className="text-primary-600 dark:text-primary-400" size={24} />
              <h3 className="text-2xl font-bold">Project Status</h3>
            </div>
            <div className="space-y-4">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{project.name}</h4>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 ${getProjectStatusColor(project.status)} rounded-full animate-pulse`}
                      />
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {project.lastUpdate}
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 0.5 }}
                      className={`h-full ${getProjectStatusColor(project.status)}`}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-400">
                      {project.progress}% complete
                    </span>
                    <span className="text-gray-500 dark:text-gray-500 capitalize">
                      {project.status.replace('-', ' ')}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Real-time Notifications */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center space-x-2 mb-6">
              <FiClock className="text-primary-600 dark:text-primary-400" size={24} />
              <h3 className="text-2xl font-bold">Notifications</h3>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              <AnimatePresence>
                {notifications.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                    No new notifications
                  </p>
                ) : (
                  notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className={`p-3 rounded-lg ${getNotificationColor(
                        notification.type
                      )} bg-opacity-10 border-l-4 ${getNotificationColor(notification.type)}`}
                    >
                      <p className="text-sm text-gray-900 dark:text-white">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {notification.time}
                      </p>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default LiveStatusIndicators
