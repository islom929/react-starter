import type { ReactNode } from 'react'
import { X, type LucideIcon } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { useDialog } from './dialog-provider'

interface DialogWrapperProps {
  title?: string
  titleClassName?: string
  icon?: LucideIcon
  iconClassName?: string
  children: ReactNode
  className?: string
}

export function DialogWrapper({
  title,
  titleClassName,
  icon: Icon,
  iconClassName,
  children,
  className,
}: DialogWrapperProps) {
  const { close } = useDialog()

  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {Icon && (
            <Icon className={cn('h-5 w-5 text-neutral-700', iconClassName)} />
          )}
          {title && (
            <h3 className={cn('text-lg font-semibold', titleClassName)}>
              {title}
            </h3>
          )}
        </div>
        <button
          onClick={close}
          className="ml-auto rounded-sm p-1 text-neutral-400 transition-colors hover:text-neutral-900"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  )
}
