import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiDollarSign, FiEdit, FiTrash2, FiSearch, FiClock } from 'react-icons/fi'
import { useQuotes } from '../../../hooks/useAdminData'
import { useToast } from '../../../contexts/ToastContext'

const QuotesManagement = () => {
  const { quotes, loading, error, updateQuote, deleteQuote } = useQuotes()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const { showToast } = useToast()

  const filteredQuotes = quotes.filter((quote) => {
    const matchesSearch =
      quote.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.projectType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await updateQuote(id, { status: newStatus })
      showToast('Quote status updated', 'success')
    } catch (err) {
      showToast('Failed to update quote', 'error')
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this quote?')) {
      try {
        await deleteQuote(id)
        showToast('Quote deleted successfully', 'success')
      } catch (err) {
        showToast('Failed to delete quote', 'error')
      }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Quotes Management</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search quotes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="completed">Completed</option>
        </select>
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
          {filteredQuotes.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
              <FiDollarSign className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600 dark:text-gray-400">No quotes found</p>
            </div>
          ) : (
            filteredQuotes.map((quote) => (
              <motion.div
                key={quote.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {quote.clientName}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      {quote.clientEmail}
                    </p>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {quote.projectType}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(quote.status)}`}>
                    {quote.status}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {quote.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm">
                    {quote.budget && (
                      <span className="text-gray-700 dark:text-gray-300 font-semibold">
                        ${quote.budget.toLocaleString()}
                      </span>
                    )}
                    <span className="text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                      <FiClock size={14} />
                      <span>{new Date(quote.createdAt).toLocaleDateString()}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <select
                      value={quote.status}
                      onChange={(e) => handleStatusChange(quote.id, e.target.value)}
                      className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                      <option value="completed">Completed</option>
                    </select>
                    <button
                      onClick={() => handleDelete(quote.id)}
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

export default QuotesManagement
