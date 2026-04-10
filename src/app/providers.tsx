import type { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { queryClient } from '@/shared/lib/query'
import { DialogProvider } from '@/components/dialog'

import '@/shared/lib/i18n'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <DialogProvider>{children}</DialogProvider>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
