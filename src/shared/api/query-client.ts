import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getErrorMessage, getStatus } from './error'
import { clearToken } from './auth-token'

interface ErrorMeta {
  skipErrorToast?: boolean
}

function handleGlobalError(error: unknown, meta: Record<string, unknown> = {}) {
  if (getStatus(error) === 401) {
    clearToken()
    return
  }
  if ((meta as ErrorMeta).skipErrorToast) return
  toast.error(getErrorMessage(error))
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => handleGlobalError(error, query.meta),
  }),
  mutationCache: new MutationCache({
    onError: (error, _vars, _ctx, mutation) =>
      handleGlobalError(error, mutation.meta),
  }),
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})
