import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import { DialogRenderer } from './dialog-renderer'

interface DialogItem {
  id: string
  content: ReactNode
}

interface DialogContextValue {
  open: (content: ReactNode) => void
  close: () => void
  closeAll: () => void
}

const DialogContext = createContext<DialogContextValue | null>(null)

let dialogId = 0

export function DialogProvider({ children }: { children: ReactNode }) {
  const [dialogs, setDialogs] = useState<DialogItem[]>([])

  const open = useCallback((content: ReactNode) => {
    const id = String(++dialogId)
    setDialogs((prev) => [...prev, { id, content }])
  }, [])

  const close = useCallback(() => {
    setDialogs((prev) => prev.slice(0, -1))
  }, [])

  const closeAll = useCallback(() => {
    setDialogs([])
  }, [])

  return (
    <DialogContext.Provider value={{ open, close, closeAll }}>
      {children}
      <DialogRenderer dialogs={dialogs} onClose={close} />
    </DialogContext.Provider>
  )
}

export function useDialog() {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error('useDialog must be used within DialogProvider')
  }
  return context
}
