/* eslint-disable max-lines-per-function */
// src/hooks/UserContext.tsx
import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

export interface User {
  id: number
  email: string
  role: string
  type: string
}

const UserContext = createContext<{
  user: User | null
  setUser: (user: User | null) => void
  logout: () => Promise<void>
}>({
  user: null,
  setUser: () => {},
  logout: async () => {},
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const MY_PROFILE = import.meta.env.VITE_ME_URL
  const LOGOUT = import.meta.env.VITE_LOGOUT_URL
  const CHECK_SESSION = import.meta.env.VITE_CHECK_SESSION_URL

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const checkSessionAndFetchUser = async () => {
      try {
        const check = await axios.get(CHECK_SESSION, {
          withCredentials: true,
        })

        if (check.data.hasSession) {
          const res = await axios.get(MY_PROFILE, {
            withCredentials: true,
          })
          setUser(res.data)
        } else {
          setUser(null)
        }
      } catch (err) {
        console.warn('Unexpected error during session check', err)
        setUser(null)
      }
    }

    checkSessionAndFetchUser()
  }, [])

  const logout = async () => {
    try {
      await axios.post(
        LOGOUT,
        {},
        {
          withCredentials: true,
        }
      )
      setUser(null)
    } catch (e) {
      console.error('Error during logout', e)
    }
  }

  return <UserContext.Provider value={{ user, setUser, logout }}>{children}</UserContext.Provider>
}

// Hook pour accéder au contexte
export const useUser = () => useContext(UserContext)
