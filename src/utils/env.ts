// Environment detection utilities

export const isProduction = () => {
  if (typeof window === 'undefined') return false
  return window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'
}

export const useAPIClient = () => {
  // In production, always use API endpoints
  // In development, try API first, fallback to direct DB
  return isProduction()
}

export const getAPIBase = () => {
  return '/api/admin'
}
