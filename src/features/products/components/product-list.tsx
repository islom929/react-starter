import { useTranslation } from 'react-i18next'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDialog, DialogWrapper } from '@/components/dialog'
import type { IProduct } from '../types'

interface IProductListProps {
  products: IProduct[]
  onDelete: (id: string) => void
}

export function ProductList({ products, onDelete }: IProductListProps) {
  const { t } = useTranslation()
  const { open, close } = useDialog()

  const handleDelete = (product: IProduct) => {
    open(
      <DialogWrapper title={t('common.confirm')}>
        <p className="text-neutral-600">{t('products.deleteConfirm')}</p>
        <p className="mt-1 font-medium">{product.name}</p>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={close}>
            {t('common.cancel')}
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onDelete(product.id)
              close()
            }}
          >
            {t('common.delete')}
          </Button>
        </div>
      </DialogWrapper>,
    )
  }

  if (products.length === 0) {
    return (
      <p className="py-8 text-center text-neutral-500">{t('common.noData')}</p>
    )
  }

  return (
    <div className="space-y-2">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex items-center justify-between rounded-lg border bg-white p-4"
        >
          <div>
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-sm text-neutral-500">{product.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold">${product.price}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(product)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
