import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { UserPayload, verifyToken } from '../utils/auth'

interface AuthContextType {
  user: UserPayload | null
  token: string | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserPayload | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('admin_token')
    if (storedToken) {
      const payload = verifyToken(storedToken)
      if (payload) {
        setToken(storedToken)
        setUser(payload)
      } else {
        localStorage.removeItem('admin_token')
      }
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Try API endpoint first (for production)
      try {
        const response = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        })

        if (response.ok) {
          const result = await response.json()
          setToken(result.token)
          setUser(result.user)
          localStorage.setItem('admin_token', result.token)
          return true
        }
      } catch (apiError) {
        // Fallback to direct DB access in development
        console.log('API endpoint not available, using direct DB access')
      }

      // Direct DB access (development fallback)
      const { authAPI } = await import('../services/api')
      const result = await authAPI.login(email, password)
      const token = result.token
      setToken(token)
      setUser(result.user)
      localStorage.setItem('admin_token', token)
      return true
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('admin_token')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
