import { useState, useEffect } from 'react'
import * as api from '../services/apiWrapper'

// Dashboard Stats Hook
export function useDashboardStats() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true)
        const data = await api.wrappedDashboardAPI.getStats()
        setStats(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stats')
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  return { stats, loading, error }
}

// Content Hook
export function useContent() {
  const [content, setContent] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchContent = async () => {
    try {
      setLoading(true)
      const data = await api.wrappedContentAPI.getAll()
      setContent(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch content')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContent()
  }, [])

  const createContent = async (data: any) => {
    try {
      const newItem = await api.wrappedContentAPI.create(data)
      setContent((prev) => [newItem, ...prev])
      return newItem
    } catch (err) {
      throw err
    }
  }

  const updateContent = async (id: number, data: any) => {
    try {
      const updated = await api.wrappedContentAPI.update(id, data)
      setContent((prev) => prev.map((item) => (item.id === id ? updated : item)))
      return updated
    } catch (err) {
      throw err
    }
  }

  const deleteContent = async (id: number) => {
    try {
      await api.wrappedContentAPI.delete(id)
      setContent((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      throw err
    }
  }

  return { content, loading, error, fetchContent, createContent, updateContent, deleteContent }
}

// Quotes Hook
export function useQuotes() {
  const [quotes, setQuotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchQuotes = async () => {
    try {
      setLoading(true)
      const data = await api.wrappedQuotesAPI.getAll()
      setQuotes(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch quotes')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuotes()
  }, [])

  const updateQuote = async (id: number, data: any) => {
    try {
      const updated = await api.wrappedQuotesAPI.update(id, data)
      setQuotes((prev) => prev.map((item) => (item.id === id ? updated : item)))
      return updated
    } catch (err) {
      throw err
    }
  }

  const createQuote = async (data: any) => {
    try {
      const newQuote = await api.wrappedQuotesAPI.create(data)
      setQuotes((prev) => [newQuote, ...prev])
      return newQuote
    } catch (err) {
      throw err
    }
  }

  const deleteQuote = async (id: number) => {
    try {
      await api.wrappedQuotesAPI.delete(id)
      setQuotes((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      throw err
    }
  }

  return { quotes, loading, error, fetchQuotes, createQuote, updateQuote, deleteQuote }
}

// Tickets Hook
export function useTickets() {
  const [tickets, setTickets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTickets = async () => {
    try {
      setLoading(true)
      const data = await api.wrappedTicketsAPI.getAll()
      setTickets(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tickets')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTickets()
  }, [])

  const createTicket = async (data: any) => {
    try {
      const newTicket = await api.wrappedTicketsAPI.create(data)
      setTickets((prev) => [newTicket, ...prev])
      return newTicket
    } catch (err) {
      throw err
    }
  }

  const updateTicket = async (id: number, data: any) => {
    try {
      const updated = await api.wrappedTicketsAPI.update(id, data)
      setTickets((prev) => prev.map((item) => (item.id === id ? updated : item)))
      return updated
    } catch (err) {
      throw err
    }
  }

  const deleteTicket = async (id: number) => {
    try {
      await api.wrappedTicketsAPI.delete(id)
      setTickets((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      throw err
    }
  }

  return { tickets, loading, error, fetchTickets, createTicket, updateTicket, deleteTicket }
}

// Reviews Hook
export function useReviews() {
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchReviews = async () => {
    try {
      setLoading(true)
      const data = await api.wrappedReviewsAPI.getAll()
      setReviews(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reviews')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  const updateReview = async (id: number, data: any) => {
    try {
      const updated = await api.wrappedReviewsAPI.update(id, data)
      setReviews((prev) => prev.map((item) => (item.id === id ? updated : item)))
      return updated
    } catch (err) {
      throw err
    }
  }

  const createReview = async (data: any) => {
    try {
      const newReview = await api.wrappedReviewsAPI.create(data)
      setReviews((prev) => [newReview, ...prev])
      return newReview
    } catch (err) {
      throw err
    }
  }

  const deleteReview = async (id: number) => {
    try {
      await api.wrappedReviewsAPI.delete(id)
      setReviews((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      throw err
    }
  }

  return { reviews, loading, error, fetchReviews, createReview, updateReview, deleteReview }
}

// Statuses Hook
export function useStatuses(type?: string) {
  const [statuses, setStatuses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStatuses = async () => {
    try {
      setLoading(true)
      const data = await api.wrappedStatusesAPI.getAll(type)
      setStatuses(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch statuses')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStatuses()
  }, [type])

  const createStatus = async (data: any) => {
    try {
      const newStatus = await api.wrappedStatusesAPI.create(data)
      setStatuses((prev) => [...prev, newStatus])
      return newStatus
    } catch (err) {
      throw err
    }
  }

  const updateStatus = async (id: number, data: any) => {
    try {
      const updated = await api.wrappedStatusesAPI.update(id, data)
      setStatuses((prev) => prev.map((item) => (item.id === id ? updated : item)))
      return updated
    } catch (err) {
      throw err
    }
  }

  const deleteStatus = async (id: number) => {
    try {
      await api.wrappedStatusesAPI.delete(id)
      setStatuses((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      throw err
    }
  }

  return { statuses, loading, error, fetchStatuses, createStatus, updateStatus, deleteStatus }
}

// Pricing Plans Hook
export function usePricingPlans() {
  const [plans, setPlans] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPlans = async () => {
    try {
      setLoading(true)
      const data = await api.wrappedPricingAPI.getAll()
      setPlans(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch pricing plans')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPlans()
  }, [])

  const createPlan = async (data: any) => {
    try {
      const newPlan = await api.wrappedPricingAPI.create(data)
      setPlans((prev) => [...prev, newPlan])
      return newPlan
    } catch (err) {
      throw err
    }
  }

  const updatePlan = async (id: number, data: any) => {
    try {
      const updated = await api.wrappedPricingAPI.update(id, data)
      setPlans((prev) => prev.map((item) => (item.id === id ? updated : item)))
      return updated
    } catch (err) {
      throw err
    }
  }

  const deletePlan = async (id: number) => {
    try {
      await api.wrappedPricingAPI.delete(id)
      setPlans((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      throw err
    }
  }

  return { plans, loading, error, fetchPlans, createPlan, updatePlan, deletePlan }
}

// Analytics Hook
export function useAnalytics() {
  const [analytics, setAnalytics] = useState<any[]>([])
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const [events, statistics] = await Promise.all([
        api.wrappedAnalyticsAPI.getAll(100),
        api.wrappedAnalyticsAPI.getStats(),
      ])
      setAnalytics(events)
      setStats(statistics)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch analytics')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()
  }, [])

  return { analytics, stats, loading, error, fetchAnalytics }
}

// Forms Hook
export function useForms() {
  const [forms, setForms] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchForms = async () => {
    try {
      setLoading(true)
      const data = await api.wrappedFormsAPI.getAll()
      setForms(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch forms')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchForms()
  }, [])

  const createForm = async (data: any) => {
    try {
      const newForm = await api.wrappedFormsAPI.create(data)
      setForms((prev) => [...prev, newForm])
      return newForm
    } catch (err) {
      throw err
    }
  }

  const updateForm = async (id: number, data: any) => {
    try {
      const updated = await api.wrappedFormsAPI.update(id, data)
      setForms((prev) => prev.map((item) => (item.id === id ? updated : item)))
      return updated
    } catch (err) {
      throw err
    }
  }

  const deleteForm = async (id: number) => {
    try {
      await api.wrappedFormsAPI.delete(id)
      setForms((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      throw err
    }
  }

  return { forms, loading, error, fetchForms, createForm, updateForm, deleteForm }
}

// Indicators Hook
export function useIndicators() {
  const [indicators, setIndicators] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchIndicators = async () => {
    try {
      setLoading(true)
      const data = await api.wrappedIndicatorsAPI.getAll()
      setIndicators(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch indicators')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchIndicators()
  }, [])

  const createIndicator = async (data: any) => {
    try {
      const newIndicator = await api.wrappedIndicatorsAPI.create(data)
      setIndicators((prev) => [...prev, newIndicator])
      return newIndicator
    } catch (err) {
      throw err
    }
  }

  const updateIndicator = async (id: number, data: any) => {
    try {
      const updated = await api.wrappedIndicatorsAPI.update(id, data)
      setIndicators((prev) => prev.map((item) => (item.id === id ? updated : item)))
      return updated
    } catch (err) {
      throw err
    }
  }

  const deleteIndicator = async (id: number) => {
    try {
      await api.wrappedIndicatorsAPI.delete(id)
      setIndicators((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      throw err
    }
  }

  return { indicators, loading, error, fetchIndicators, createIndicator, updateIndicator, deleteIndicator }
}

// Social Media Hook
export function useSocialMedia() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const data = await api.wrappedSocialMediaAPI.getAll()
      setPosts(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch social media posts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const createPost = async (data: any) => {
    try {
      const newPost = await api.wrappedSocialMediaAPI.create(data)
      setPosts((prev) => [...prev, newPost])
      return newPost
    } catch (err) {
      throw err
    }
  }

  const updatePost = async (id: number, data: any) => {
    try {
      const updated = await api.wrappedSocialMediaAPI.update(id, data)
      setPosts((prev) => prev.map((item) => (item.id === id ? updated : item)))
      return updated
    } catch (err) {
      throw err
    }
  }

  const deletePost = async (id: number) => {
    try {
      await api.wrappedSocialMediaAPI.delete(id)
      setPosts((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      throw err
    }
  }

  return { posts, loading, error, fetchPosts, createPost, updatePost, deletePost }
}

// Notifications Hook
export function useNotifications() {
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      const data = await api.wrappedNotificationsAPI.getAll()
      setNotifications(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch notifications')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  const createNotification = async (data: any) => {
    try {
      const newNotification = await api.wrappedNotificationsAPI.create(data)
      setNotifications((prev) => [...prev, newNotification])
      return newNotification
    } catch (err) {
      throw err
    }
  }

  const updateNotification = async (id: number, data: any) => {
    try {
      const updated = await api.wrappedNotificationsAPI.update(id, data)
      setNotifications((prev) => prev.map((item) => (item.id === id ? updated : item)))
      return updated
    } catch (err) {
      throw err
    }
  }

  const deleteNotification = async (id: number) => {
    try {
      await api.wrappedNotificationsAPI.delete(id)
      setNotifications((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      throw err
    }
  }

  return { notifications, loading, error, fetchNotifications, createNotification, updateNotification, deleteNotification }
}

// SEO Hook
export function useSEO() {
  const [seoSettings, setSeoSettings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSEO = async () => {
    try {
      setLoading(true)
      const data = await api.wrappedSEOAPI.getAll()
      setSeoSettings(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch SEO settings')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSEO()
  }, [])

  const createSEO = async (data: any) => {
    try {
      const newSEO = await api.wrappedSEOAPI.create(data)
      setSeoSettings((prev) => [...prev, newSEO])
      return newSEO
    } catch (err) {
      throw err
    }
  }

  const updateSEO = async (page: string, data: any) => {
    try {
      const updated = await api.wrappedSEOAPI.update(page, data)
      setSeoSettings((prev) => prev.map((item) => (item.page === page ? updated : item)))
      return updated
    } catch (err) {
      throw err
    }
  }

  const deleteSEO = async (page: string) => {
    try {
      await api.wrappedSEOAPI.delete(page)
      setSeoSettings((prev) => prev.filter((item) => item.page !== page))
    } catch (err) {
      throw err
    }
  }

  return { seoSettings, loading, error, fetchSEO, createSEO, updateSEO, deleteSEO }
}

// Playbooks Hook
export function usePlaybooks() {
  const [playbooks, setPlaybooks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPlaybooks = async () => {
    try {
      setLoading(true)
      const data = await api.wrappedPlaybooksAPI.getAll()
      setPlaybooks(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch playbooks')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPlaybooks()
  }, [])

  const createPlaybook = async (data: any) => {
    try {
      const newPlaybook = await api.wrappedPlaybooksAPI.create(data)
      setPlaybooks((prev) => [...prev, newPlaybook])
      return newPlaybook
    } catch (err) {
      throw err
    }
  }

  const updatePlaybook = async (id: number, data: any) => {
    try {
      const updated = await api.wrappedPlaybooksAPI.update(id, data)
      setPlaybooks((prev) => prev.map((item) => (item.id === id ? updated : item)))
      return updated
    } catch (err) {
      throw err
    }
  }

  const deletePlaybook = async (id: number) => {
    try {
      await api.wrappedPlaybooksAPI.delete(id)
      setPlaybooks((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      throw err
    }
  }

  return { playbooks, loading, error, fetchPlaybooks, createPlaybook, updatePlaybook, deletePlaybook }
}

// Site Settings Hook
export function useSiteSettings() {
  const [settings, setSettings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const data = await api.wrappedSiteSettingsAPI.getAll()
      setSettings(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch site settings')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  const updateSetting = async (key: string, value: string) => {
    try {
      const updated = await api.wrappedSiteSettingsAPI.update(key, value)
      setSettings((prev) => prev.map((item) => (item.key === key ? updated : item)))
      return updated
    } catch (err) {
      throw err
    }
  }

  return { settings, loading, error, fetchSettings, updateSetting }
}
