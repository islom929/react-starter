import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/form/form-input'
import { FormTextarea } from '@/components/form/form-textarea'
import { FormSelect } from '@/components/form/form-select'
import { createProductSchema, type TProductFormValues } from '../schemas'

interface IProductFormProps {
  onSubmit: (values: TProductFormValues) => void
  isLoading?: boolean
}

export function ProductForm({ onSubmit, isLoading }: IProductFormProps) {
  const { t } = useTranslation()

  const schema = useMemo(() => createProductSchema(t), [t])
  const categories = useMemo(
    () => [
      { value: 'electronics', label: t('products.cat.electronics') },
      { value: 'books', label: t('products.cat.books') },
      { value: 'clothing', label: t('products.cat.clothing') },
    ],
    [t],
  )

  const form = useForm<TProductFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      price: 0,
      description: '',
      category: '',
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          control={form.control}
          name="name"
          label={t('products.name')}
          placeholder={t('products.namePlaceholder')}
        />

        <FormInput
          control={form.control}
          name="price"
          label={t('products.price')}
          type="number"
          placeholder="0"
        />

        <FormSelect
          control={form.control}
          name="category"
          label={t('products.category')}
          placeholder={t('products.selectPlaceholder')}
          options={categories}
        />

        <FormTextarea
          control={form.control}
          name="description"
          label={t('products.description')}
          placeholder={t('products.descriptionPlaceholder')}
          rows={3}
        />

        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? t('common.loading') : t('common.save')}
          </Button>
        </div>
      </form>
    </Form>
  )
}
