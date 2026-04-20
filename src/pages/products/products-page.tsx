import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { useDialog, DialogWrapper } from '@/components/dialog'
import { ProductForm } from '@/features/products/components/product-form'
import { ProductList } from '@/features/products/components/product-list'
import {
  useProducts,
  useCreateProduct,
  useDeleteProduct,
} from '@/features/products/hooks'
import type { TProductFormValues } from '@/features/products/schemas'

export function ProductsPage() {
  const { t } = useTranslation()
  const { open, close } = useDialog()
  const { data: products, isLoading } = useProducts()
  const createProduct = useCreateProduct()
  const deleteProduct = useDeleteProduct()

  const handleCreate = (values: TProductFormValues) => {
    createProduct.mutate(values, {
      onSuccess: () => close(),
    })
  }

  const openCreateDialog = () => {
    open(
      <DialogWrapper title={t('products.addProduct')}>
        <ProductForm
          onSubmit={handleCreate}
          isLoading={createProduct.isPending}
        />
      </DialogWrapper>,
    )
  }

  if (isLoading) {
    return <p className="py-8 text-center">{t('common.loading')}</p>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('products.title')}</h1>
        <Button onClick={openCreateDialog}>{t('products.addProduct')}</Button>
      </div>

      <ProductList
        products={products || []}
        onDelete={(id) => deleteProduct.mutate(id)}
      />
    </div>
  )
}
