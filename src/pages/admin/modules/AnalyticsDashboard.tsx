import { motion } from 'framer-motion'
import { FiBarChart2, FiTrendingUp, FiUsers, FiMousePointer, FiActivity, FiArrowUpRight } from 'react-icons/fi'
import { useAnalytics } from '../../../hooks/useAdminData'

const AnalyticsDashboard = () => {
  const { analytics, stats, loading, error } = useAnalytics()

  if (loading) {
    return (
      <div className="p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 md:p-6 lg:p-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      </div>
    )
  }

  const analyticsCards = [
    {
      label: 'Total Events',
      value: stats?.totalEvents || 0,
      icon: <FiBarChart2 />,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
      change: '+12%',
    },
    {
      label: 'Categories',
      value: stats?.eventsByCategory?.length || 0,
      icon: <FiTrendingUp />,
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-800/20',
      change: '+5%',
    },
    {
      label: 'Unique Users',
      value: analytics?.filter((a, i, self) => self.findIndex((b) => b.userId === a.userId) === i).length || 0,
      icon: <FiUsers />,
      gradient: 'from-purple-500 to-violet-600',
      bgGradient: 'from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-800/20',
      change: '+8%',
    },
    {
      label: 'Sessions',
      value: analytics?.filter((a, i, self) => self.findIndex((b) => b.sessionId === a.sessionId) === i).length || 0,
      icon: <FiMousePointer />,
      gradient: 'from-orange-500 to-amber-600',
      bgGradient: 'from-orange-50 to-amber-100 dark:from-orange-900/20 dark:to-amber-800/20',
      change: '+15%',
    },
  ]

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Analytics Dashboard</h2>
        <p className="text-gray-600 dark:text-gray-400">Track and analyze your website performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsCards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            <div className="relative flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{card.label}</p>
                <div className="flex items-baseline space-x-2 mb-2">
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {card.value.toLocaleString()}
                  </p>
                  <div className="flex items-center space-x-1 text-xs font-semibold text-green-600 dark:text-green-400">
                    <FiArrowUpRight size={12} />
                    <span>{card.change}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">vs last period</p>
              </div>
              <div className={`p-4 rounded-xl bg-gradient-to-br ${card.gradient} text-white shadow-lg`}>
                {card.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Events by Category */}
      {stats?.eventsByCategory && stats.eventsByCategory.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Events by Category</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Distribution of events across categories</p>
            </div>
          </div>
          <div className="space-y-4">
            {stats.eventsByCategory.map((cat: any, index: number) => {
              const percentage = ((cat.count / stats.totalEvents) * 100).toFixed(1)
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {cat.category || 'Uncategorized'}
                    </span>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white w-16 text-right">
                        {cat.count}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 w-12 text-right">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* Recent Events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recent Events</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Latest activity on your platform</p>
          </div>
          <button className="text-sm text-primary-600 dark:text-primary-400 hover:underline">View All</button>
        </div>
        <div className="space-y-3">
          {analytics.slice(0, 10).map((event: any, index: number) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg group-hover:scale-110 transition-transform">
                  <FiActivity className="text-primary-600 dark:text-primary-400" size={18} />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{event.event}</p>
                  {event.category && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{event.category}</p>
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(event.createdAt).toLocaleString()}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default AnalyticsDashboard
