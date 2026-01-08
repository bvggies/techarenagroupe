import { motion } from 'framer-motion'
import { FiUsers, FiFileText, FiDollarSign, FiHeadphones, FiTrendingUp, FiStar } from 'react-icons/fi'
import { useDashboardStats } from '../../hooks/useAdminData'

const DashboardOverview = () => {
  const { stats, loading, error } = useDashboardStats()

  const statCards = [
    { label: 'Total Users', value: stats?.users || 0, icon: <FiUsers />, color: 'bg-blue-500' },
    { label: 'Content Pages', value: stats?.content || 0, icon: <FiFileText />, color: 'bg-green-500' },
    { label: 'Active Quotes', value: stats?.quotes || 0, icon: <FiDollarSign />, color: 'bg-yellow-500' },
    { label: 'Open Tickets', value: stats?.tickets || 0, icon: <FiHeadphones />, color: 'bg-red-500' },
    { label: 'Projects', value: stats?.projects || 0, icon: <FiTrendingUp />, color: 'bg-purple-500' },
    { label: 'Reviews', value: stats?.reviews || 0, icon: <FiStar />, color: 'bg-pink-500' },
  ]

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Dashboard Overview</h2>

      {loading && (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {stat.value.toLocaleString()}
                </p>
              </div>
              <div className={`${stat.color} p-4 rounded-lg text-white`}>{stat.icon}</div>
            </div>
          </motion.div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-primary-500 rounded-full" />
                <span className="text-gray-600 dark:text-gray-400">
                  Activity item {i} - {new Date().toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors">
              Create New Content
            </button>
            <button className="w-full text-left px-4 py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors">
              View Analytics
            </button>
            <button className="w-full text-left px-4 py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors">
              Manage Settings
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardOverview
