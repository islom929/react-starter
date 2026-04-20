import type { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { Toaster } from 'sonner'
import { queryClient } from '@/shared/api'
import { DialogProvider } from '@/components/dialog'

import '@/shared/lib/i18n'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <TooltipProvider>
          <DialogProvider>
            {children}
            <Toaster position="top-right" richColors />
          </DialogProvider>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
