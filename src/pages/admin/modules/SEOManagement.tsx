import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiSearch as FiSEO } from 'react-icons/fi'
import { useSEO } from '../../../hooks/useAdminData'
import { useToast } from '../../../contexts/ToastContext'

const SEOManagement = () => {
  const { seoSettings, loading, error, createSEO, updateSEO, deleteSEO } = useSEO()
  const [searchTerm, setSearchTerm] = useState('')
  const { showToast } = useToast()

  const filteredSEO = seoSettings.filter((seo) =>
    seo.page.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = async (page: string) => {
    if (confirm('Are you sure you want to delete this SEO setting?')) {
      try {
        await deleteSEO(page)
        showToast('SEO setting deleted successfully', 'success')
      } catch (err) {
        showToast('Failed to delete SEO setting', 'error')
      }
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">SEO Management</h2>
        <button
          onClick={() => {
            showToast('Create SEO setting feature coming soon', 'info')
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <FiPlus />
          <span>New SEO Setting</span>
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search pages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
      </div>

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
        <div className="grid grid-cols-1 gap-4">
          {filteredSEO.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
              <FiSEO className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600 dark:text-gray-400">No SEO settings found</p>
            </div>
          ) : (
            filteredSEO.map((seo) => (
              <motion.div
                key={seo.page}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Page: <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{seo.page}</code>
                    </h3>
                    {seo.title && (
                      <p className="text-gray-700 dark:text-gray-300 mb-1">
                        <span className="font-semibold">Title:</span> {seo.title}
                      </p>
                    )}
                    {seo.description && (
                      <p className="text-gray-600 dark:text-gray-400 mb-1 line-clamp-2">
                        <span className="font-semibold">Description:</span> {seo.description}
                      </p>
                    )}
                    {seo.keywords && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        <span className="font-semibold">Keywords:</span> {seo.keywords}
                      </p>
                    )}
                    {seo.canonicalUrl && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Canonical:</span>{' '}
                        <a
                          href={seo.canonicalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:underline"
                        >
                          {seo.canonicalUrl}
                        </a>
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Updated: {new Date(seo.updatedAt).toLocaleDateString()}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        showToast('Edit SEO setting feature coming soon', 'info')
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(seo.page)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default SEOManagement
