import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiHome,
  FiFileText,
  FiBarChart2,
  FiDollarSign,
  FiHeadphones,
  FiSettings,
  FiLayers,
  FiDatabase,
  FiTrendingUp,
  FiStar,
  FiShare2,
  FiBell,
  FiSearch,
  FiBook,
  FiGlobe,
  FiMenu,
  FiX,
  FiLogOut,
  FiUser,
  FiChevronRight,
} from 'react-icons/fi'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import DashboardOverview from './DashboardOverview'
import ContentManagement from './modules/ContentManagement'
import AnalyticsDashboard from './modules/AnalyticsDashboard'
import QuotesManagement from './modules/QuotesManagement'
import TicketsManagement from './modules/TicketsManagement'
import StatusManagement from './modules/StatusManagement'
import FormsManagement from './modules/FormsManagement'
import CMSManagement from './modules/CMSManagement'
import IndicatorsManagement from './modules/IndicatorsManagement'
import PricingManagement from './modules/PricingManagement'
import ReviewsManagement from './modules/ReviewsManagement'
import SocialMediaManagement from './modules/SocialMediaManagement'
import NotificationsManagement from './modules/NotificationsManagement'
import SEOManagement from './modules/SEOManagement'
import PlaybooksManagement from './modules/PlaybooksManagement'
import SiteSettingsManagement from './modules/SiteSettingsManagement'

interface MenuItem {
  id: string
  label: string
  icon: React.ReactNode
  component: string
  color: string
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <FiHome />, component: 'Dashboard', color: 'bg-blue-500' },
  { id: 'content', label: 'Content', icon: <FiFileText />, component: 'Content', color: 'bg-purple-500' },
  { id: 'analytics', label: 'Analytics', icon: <FiBarChart2 />, component: 'Analytics', color: 'bg-green-500' },
  { id: 'quotes', label: 'Quotes', icon: <FiDollarSign />, component: 'Quotes', color: 'bg-yellow-500' },
  { id: 'tickets', label: 'Tickets', icon: <FiHeadphones />, component: 'Tickets', color: 'bg-red-500' },
  { id: 'status', label: 'Status', icon: <FiSettings />, component: 'Status', color: 'bg-indigo-500' },
  { id: 'forms', label: 'Forms', icon: <FiLayers />, component: 'Forms', color: 'bg-pink-500' },
  { id: 'cms', label: 'CMS', icon: <FiDatabase />, component: 'CMS', color: 'bg-teal-500' },
  { id: 'indicators', label: 'Indicators', icon: <FiTrendingUp />, component: 'Indicators', color: 'bg-orange-500' },
  { id: 'pricing', label: 'Pricing', icon: <FiDollarSign />, component: 'Pricing', color: 'bg-emerald-500' },
  { id: 'reviews', label: 'Reviews', icon: <FiStar />, component: 'Reviews', color: 'bg-amber-500' },
  { id: 'social', label: 'Social Media', icon: <FiShare2 />, component: 'Social', color: 'bg-cyan-500' },
  { id: 'notifications', label: 'Notifications', icon: <FiBell />, component: 'Notifications', color: 'bg-rose-500' },
  { id: 'seo', label: 'SEO', icon: <FiSearch />, component: 'SEO', color: 'bg-violet-500' },
  { id: 'playbooks', label: 'Playbooks', icon: <FiBook />, component: 'Playbooks', color: 'bg-sky-500' },
  { id: 'site', label: 'Site Settings', icon: <FiGlobe />, component: 'Site', color: 'bg-gray-500' },
]

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const ActiveComponent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <DashboardOverview />
      case 'content':
        return <ContentManagement />
      case 'analytics':
        return <AnalyticsDashboard />
      case 'quotes':
        return <QuotesManagement />
      case 'tickets':
        return <TicketsManagement />
      case 'status':
        return <StatusManagement />
      case 'forms':
        return <FormsManagement />
      case 'cms':
        return <CMSManagement />
      case 'indicators':
        return <IndicatorsManagement />
      case 'pricing':
        return <PricingManagement />
      case 'reviews':
        return <ReviewsManagement />
      case 'social':
        return <SocialMediaManagement />
      case 'notifications':
        return <NotificationsManagement />
      case 'seo':
        return <SEOManagement />
      case 'playbooks':
        return <PlaybooksManagement />
      case 'site':
        return <SiteSettingsManagement />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center justify-between px-4 md:px-6 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors lg:hidden"
            >
              {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:flex p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Welcome back, {(user as any)?.name || user?.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <FiUser className="text-white" size={16} />
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-900 dark:text-white">{(user as any)?.name || 'Admin'}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-xl transition-all duration-200 font-medium"
            >
              <FiLogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Sidebar */}
        <AnimatePresence>
          {(sidebarOpen || mobileMenuOpen) && (
            <motion.aside
              initial={{ x: -280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -280, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed lg:sticky top-[73px] left-0 h-[calc(100vh-73px)] z-30 bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700 overflow-y-auto ${
                sidebarOpen ? 'w-72' : 'w-0'
              }`}
            >
              <nav className="p-4 space-y-1">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      setActiveMenu(item.id)
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                      activeMenu === item.id
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg ${
                          activeMenu === item.id
                            ? 'bg-white/20 text-white'
                            : `${item.color} text-white opacity-80 group-hover:opacity-100`
                        }`}
                      >
                        {item.icon}
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {activeMenu === item.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-white"
                      >
                        <FiChevronRight />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <motion.div
            key={activeMenu}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ActiveComponent />
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard
