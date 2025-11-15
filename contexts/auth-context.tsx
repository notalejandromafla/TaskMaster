'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simular verificación de credenciales
    // En producción, esto haría una llamada a una API
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const foundUser = storedUsers.find(
      (u: { email: string; password: string }) => u.email === email && u.password === password
    )

    if (foundUser) {
      const userData = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
      }
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      return true
    }

    return false
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Verificar si el usuario ya existe
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const userExists = storedUsers.some((u: { email: string }) => u.email === email)

    if (userExists) {
      return false
    }

    // Crear nuevo usuario
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // En producción, esto debería estar hasheado
    }

    storedUsers.push(newUser)
    localStorage.setItem('users', JSON.stringify(storedUsers))

    // Iniciar sesión automáticamente después del registro
    const userData = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    }
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))

    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

