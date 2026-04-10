import { useEffect, type ReactNode } from 'react'
import { cn } from '@/shared/lib/utils'

interface DialogItem {
  id: string
  content: ReactNode
}

interface DialogRendererProps {
  dialogs: DialogItem[]
  onClose: () => void
}

export function DialogRenderer({ dialogs, onClose }: DialogRendererProps) {
  useEffect(() => {
    if (dialogs.length === 0) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [dialogs.length, onClose])

  if (dialogs.length === 0) return null

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {dialogs.map((dialog, index) => (
        <div
          key={dialog.id}
          className={cn(
            'fixed inset-0 flex items-center justify-center p-4',
            index < dialogs.length - 1 && 'pointer-events-none',
          )}
          style={{ zIndex: 51 + index }}
          onClick={onClose}
        >
          <div
            className={cn(
              'relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl',
              index < dialogs.length - 1 && 'pointer-events-auto opacity-50',
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {dialog.content}
          </div>
        </div>
      ))}
    </div>
  )
}
