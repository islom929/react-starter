import { isAxiosError } from 'axios'
import i18n from '@/shared/lib/i18n'

export interface ApiErrorPayload {
  message?: string | string[]
  detail?: string
  error?: string
}

export function getErrorMessage(
  error: unknown,
  fallbackKey = 'error.unexpected',
): string {
  const fallback = i18n.t(fallbackKey)

  if (isAxiosError<ApiErrorPayload>(error)) {
    const data = error.response?.data
    const raw = data?.message ?? data?.detail ?? data?.error
    if (Array.isArray(raw)) return raw[0] ?? fallback
    if (typeof raw === 'string' && raw.length > 0) return raw
    if (error.code === 'ERR_NETWORK') return i18n.t('error.network')
    if (error.message) return error.message
  }
  if (error instanceof Error) return error.message
  return fallback
}

export function getStatus(error: unknown): number | undefined {
  return isAxiosError(error) ? error.response?.status : undefined
}
