import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiSearch as FiSEO, FiSave } from 'react-icons/fi'
import { useSEO } from '../../../hooks/useAdminData'
import { useToast } from '../../../contexts/ToastContext'
import Modal from '../../../components/admin/Modal'
import FormField from '../../../components/admin/FormField'

const SEOManagement = () => {
  const { seoSettings, loading, error, createSEO, updateSEO, deleteSEO, fetchSEO } = useSEO()
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [formData, setFormData] = useState({
    page: '',
    title: '',
    description: '',
    keywords: '',
    ogImage: '',
    canonicalUrl: '',
  })
  const { showToast } = useToast()

  const filteredSEO = seoSettings.filter((seo) =>
    seo.page.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOpenModal = (item?: any) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        page: item.page || '',
        title: item.title || '',
        description: item.description || '',
        keywords: item.keywords || '',
        ogImage: item.ogImage || '',
        canonicalUrl: item.canonicalUrl || '',
      })
    } else {
      setEditingItem(null)
      setFormData({
        page: '',
        title: '',
        description: '',
        keywords: '',
        ogImage: '',
        canonicalUrl: '',
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingItem(null)
    setFormData({
      page: '',
      title: '',
      description: '',
      keywords: '',
      ogImage: '',
      canonicalUrl: '',
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const submitData: any = {
        page: formData.page,
        title: formData.title,
        description: formData.description,
        keywords: formData.keywords,
        ogImage: formData.ogImage,
        canonicalUrl: formData.canonicalUrl,
      }

      if (editingItem) {
        await updateSEO(editingItem.page, submitData)
        showToast('SEO setting updated successfully', 'success')
      } else {
        await createSEO(submitData)
        showToast('SEO setting created successfully', 'success')
      }
      handleCloseModal()
      fetchSEO()
    } catch (err: any) {
      showToast(err.message || 'Failed to save SEO setting', 'error')
    }
  }

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
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">SEO Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage SEO settings for all pages</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-lg shadow-primary-500/30 font-medium"
        >
          <FiPlus size={20} />
          <span>New SEO Setting</span>
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search pages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
          />
        </div>
      </div>

      {loading && (
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 gap-4">
          {filteredSEO.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
              <FiSEO className="mx-auto text-gray-400 mb-4" size={64} />
              <p className="text-gray-600 dark:text-gray-400 text-lg">No SEO settings found</p>
            </div>
          ) : (
            filteredSEO.map((seo, index) => (
              <motion.div
                key={seo.page}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
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
                      onClick={() => handleOpenModal(seo)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(seo.page)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingItem ? 'Edit SEO Setting' : 'Create New SEO Setting'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Page"
            name="page"
            type="text"
            value={formData.page}
            onChange={(value) => setFormData({ ...formData, page: value })}
            placeholder="e.g., /home, /about"
            required
            disabled={!!editingItem}
          />

          <FormField
            label="Title"
            name="title"
            type="text"
            value={formData.title}
            onChange={(value) => setFormData({ ...formData, title: value })}
            placeholder="Page title (60 characters recommended)"
          />

          <FormField
            label="Description"
            name="description"
            type="textarea"
            value={formData.description}
            onChange={(value) => setFormData({ ...formData, description: value })}
            placeholder="Meta description (160 characters recommended)"
            rows={3}
          />

          <FormField
            label="Keywords"
            name="keywords"
            type="text"
            value={formData.keywords}
            onChange={(value) => setFormData({ ...formData, keywords: value })}
            placeholder="keyword1, keyword2, keyword3"
          />

          <FormField
            label="OG Image URL"
            name="ogImage"
            type="text"
            value={formData.ogImage}
            onChange={(value) => setFormData({ ...formData, ogImage: value })}
            placeholder="https://example.com/og-image.jpg"
          />

          <FormField
            label="Canonical URL"
            name="canonicalUrl"
            type="text"
            value={formData.canonicalUrl}
            onChange={(value) => setFormData({ ...formData, canonicalUrl: value })}
            placeholder="https://example.com/page"
          />

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-lg shadow-primary-500/30 font-medium"
            >
              <FiSave size={18} />
              <span>{editingItem ? 'Update' : 'Create'}</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default SEOManagement
