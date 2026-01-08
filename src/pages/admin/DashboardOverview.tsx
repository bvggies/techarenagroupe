import { motion } from 'framer-motion'
import { FiUsers, FiFileText, FiDollarSign, FiHeadphones, FiTrendingUp, FiStar, FiArrowUp, FiArrowDown, FiActivity } from 'react-icons/fi'
import { useDashboardStats } from '../../hooks/useAdminData'
import { useNavigate } from 'react-router-dom'

const DashboardOverview = () => {
  const { stats, loading, error } = useDashboardStats()
  const navigate = useNavigate()

  const statCards = [
    { 
      label: 'Total Users', 
      value: stats?.users || 0, 
      icon: <FiUsers />, 
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
      change: '+12%',
      positive: true,
      route: '/admin/dashboard?tab=users'
    },
    { 
      label: 'Content Pages', 
      value: stats?.content || 0, 
      icon: <FiFileText />, 
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-800/20',
      change: '+8%',
      positive: true,
      route: '/admin/dashboard?tab=content'
    },
    { 
      label: 'Active Quotes', 
      value: stats?.quotes || 0, 
      icon: <FiDollarSign />, 
      gradient: 'from-yellow-500 to-amber-600',
      bgGradient: 'from-yellow-50 to-amber-100 dark:from-yellow-900/20 dark:to-amber-800/20',
      change: '+5%',
      positive: true,
      route: '/admin/dashboard?tab=quotes'
    },
    { 
      label: 'Open Tickets', 
      value: stats?.tickets || 0, 
      icon: <FiHeadphones />, 
      gradient: 'from-red-500 to-rose-600',
      bgGradient: 'from-red-50 to-rose-100 dark:from-red-900/20 dark:to-rose-800/20',
      change: '-3%',
      positive: false,
      route: '/admin/dashboard?tab=tickets'
    },
    { 
      label: 'Active Projects', 
      value: stats?.projects || 0, 
      icon: <FiTrendingUp />, 
      gradient: 'from-purple-500 to-violet-600',
      bgGradient: 'from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-800/20',
      change: '+15%',
      positive: true,
      route: '/admin/dashboard?tab=projects'
    },
    { 
      label: 'Total Reviews', 
      value: stats?.reviews || 0, 
      icon: <FiStar />, 
      gradient: 'from-pink-500 to-rose-600',
      bgGradient: 'from-pink-50 to-rose-100 dark:from-pink-900/20 dark:to-rose-800/20',
      change: '+22%',
      positive: true,
      route: '/admin/dashboard?tab=reviews'
    },
  ]

  const quickActions = [
    { label: 'Create New Content', icon: <FiFileText />, color: 'bg-gradient-to-r from-blue-500 to-blue-600', route: 'content' },
    { label: 'View Analytics', icon: <FiActivity />, color: 'bg-gradient-to-r from-green-500 to-green-600', route: 'analytics' },
    { label: 'Manage Settings', icon: <FiTrendingUp />, color: 'bg-gradient-to-r from-purple-500 to-purple-600', route: 'site' },
  ]

  if (loading) {
    return (
      <div className="p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
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

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard Overview</h2>
        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening with your business today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            
            <div className="relative flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                <div className="flex items-baseline space-x-2 mb-2">
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value.toLocaleString()}
                  </p>
                  <div className={`flex items-center space-x-1 text-xs font-semibold ${
                    stat.positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {stat.positive ? <FiArrowUp size={12} /> : <FiArrowDown size={12} />}
                    <span>{stat.change}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">vs last month</p>
              </div>
              <div className={`p-4 rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg shadow-${stat.gradient.split(' ')[1]}/30`}>
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Quick Actions</h3>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 4 }}
                onClick={() => {
                  // Navigate to the route - you'll need to implement navigation logic
                  console.log('Navigate to:', action.route)
                }}
                className="w-full flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:shadow-md transition-all duration-200 group"
              >
                <div className={`p-3 rounded-lg ${action.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  {action.icon}
                </div>
                <span className="flex-1 text-left font-medium text-gray-900 dark:text-white">{action.label}</span>
                <FiArrowUp className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transform -rotate-45 transition-colors" />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h3>
            <button className="text-sm text-primary-600 dark:text-primary-400 hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {[
              { action: 'New content created', time: '2 minutes ago', type: 'content' },
              { action: 'Quote approved', time: '15 minutes ago', type: 'quote' },
              { action: 'Ticket resolved', time: '1 hour ago', type: 'ticket' },
              { action: 'Review published', time: '2 hours ago', type: 'review' },
              { action: 'Settings updated', time: '3 hours ago', type: 'settings' },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
              >
                <div className="mt-1 w-2 h-2 bg-primary-500 rounded-full group-hover:scale-150 transition-transform" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Performance Chart Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Performance Overview</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Last 30 days</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300">7D</button>
            <button className="px-3 py-1 text-sm bg-primary-100 dark:bg-primary-900/30 rounded-lg text-primary-700 dark:text-primary-300 font-medium">30D</button>
            <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300">90D</button>
          </div>
        </div>
        <div className="h-64 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl">
          <div className="text-center">
            <FiActivity className="mx-auto text-gray-400 mb-2" size={32} />
            <p className="text-sm text-gray-500 dark:text-gray-400">Chart visualization coming soon</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default DashboardOverview
