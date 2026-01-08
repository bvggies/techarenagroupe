import { useState } from 'react'
import { motion } from 'framer-motion'
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
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <FiHome />, component: 'Dashboard' },
  { id: 'content', label: 'Content Management', icon: <FiFileText />, component: 'Content' },
  { id: 'analytics', label: 'Analytics', icon: <FiBarChart2 />, component: 'Analytics' },
  { id: 'quotes', label: 'Quotes', icon: <FiDollarSign />, component: 'Quotes' },
  { id: 'tickets', label: 'Support Tickets', icon: <FiHeadphones />, component: 'Tickets' },
  { id: 'status', label: 'Status Management', icon: <FiSettings />, component: 'Status' },
  { id: 'forms', label: 'Form Management', icon: <FiLayers />, component: 'Forms' },
  { id: 'cms', label: 'CMS', icon: <FiDatabase />, component: 'CMS' },
  { id: 'indicators', label: 'Indicators', icon: <FiTrendingUp />, component: 'Indicators' },
  { id: 'pricing', label: 'Pricing Tables', icon: <FiDollarSign />, component: 'Pricing' },
  { id: 'reviews', label: 'Reviews', icon: <FiStar />, component: 'Reviews' },
  { id: 'social', label: 'Social Media', icon: <FiShare2 />, component: 'Social' },
  { id: 'notifications', label: 'Notifications', icon: <FiBell />, component: 'Notifications' },
  { id: 'seo', label: 'SEO Management', icon: <FiSearch />, component: 'SEO' },
  { id: 'playbooks', label: 'Playbooks', icon: <FiBook />, component: 'Playbooks' },
  { id: 'site', label: 'Site Settings', icon: <FiGlobe />, component: 'Site' },
]

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const ActiveComponent = () => {
    const item = menuItems.find((m) => m.id === activeMenu)
    
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
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{item?.label || 'Dashboard'}</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
              <p className="text-gray-600 dark:text-gray-400">
                {item?.label} module is coming soon. This will contain all management features for{' '}
                {item?.label.toLowerCase()}.
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
              <FiUser />
              <span>{user?.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <FiLogOut />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{ width: sidebarOpen ? 280 : 0 }}
          className="bg-white dark:bg-gray-800 shadow-sm border-r border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeMenu === item.id
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {item.icon}
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <ActiveComponent />
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard
