import { useEffect, useState } from 'react'
import { getToken } from '@/shared/api'
import { AUTH_EVENT } from '@/shared/constants'

export function useAuth() {
  const [token, setTokenState] = useState<string | null>(() => getToken())

  useEffect(() => {
    const sync = () => setTokenState(getToken())
    window.addEventListener('storage', sync)
    window.addEventListener(AUTH_EVENT, sync)
    return () => {
      window.removeEventListener('storage', sync)
      window.removeEventListener(AUTH_EVENT, sync)
    }
  }, [])

  return {
    token,
    isAuthenticated: !!token,
  }
}
