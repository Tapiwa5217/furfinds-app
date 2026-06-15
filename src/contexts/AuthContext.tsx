'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type UserRole = 'pet-parent' | 'business' | null

interface AuthUser {
  role: UserRole
  name?: string
  email?: string
  businessApproved?: boolean
}

interface AuthContextType {
  user: AuthUser | null
  loaded: boolean
  login: (user: AuthUser) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loaded: false,
  login: () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('furfinds_user')
      if (stored) setUser(JSON.parse(stored))
    } catch {}
    setLoaded(true)
  }, [])

  const login = (u: AuthUser) => {
    setUser(u)
    localStorage.setItem('furfinds_user', JSON.stringify(u))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('furfinds_user')
  }

  return <AuthContext.Provider value={{ user, loaded, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
