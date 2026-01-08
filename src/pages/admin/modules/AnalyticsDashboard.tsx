import { motion } from 'framer-motion'
import { FiBarChart2, FiTrendingUp, FiUsers, FiMousePointer } from 'react-icons/fi'
import { useAnalytics } from '../../../hooks/useAdminData'

const AnalyticsDashboard = () => {
  const { analytics, stats, loading, error } = useAnalytics()

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Analytics Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Events</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {stats?.totalEvents || 0}
              </p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
              <FiBarChart2 className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Categories</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {stats?.eventsByCategory?.length || 0}
              </p>
            </div>
            <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
              <FiTrendingUp className="text-green-600 dark:text-green-400" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Unique Users</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {analytics?.filter((a, i, self) => self.findIndex((b) => b.userId === a.userId) === i).length || 0}
              </p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg">
              <FiUsers className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sessions</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {analytics?.filter((a, i, self) => self.findIndex((b) => b.sessionId === a.sessionId) === i).length || 0}
              </p>
            </div>
            <div className="bg-orange-100 dark:bg-orange-900 p-4 rounded-lg">
              <FiMousePointer className="text-orange-600 dark:text-orange-400" size={24} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Events by Category */}
      {stats?.eventsByCategory && stats.eventsByCategory.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Events by Category
          </h3>
          <div className="space-y-3">
            {stats.eventsByCategory.map((cat: any, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">{cat.category || 'Uncategorized'}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(cat.count / stats.totalEvents) * 100}%` }}
                      className="h-full bg-primary-500"
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white w-12 text-right">
                    {cat.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Events */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Recent Events</h3>
        <div className="space-y-3">
          {analytics.slice(0, 10).map((event: any, index: number) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{event.event}</p>
                {event.category && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">{event.category}</p>
                )}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(event.createdAt).toLocaleString()}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AnalyticsDashboard
