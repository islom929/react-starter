import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/form/form-input'
import { FormTextarea } from '@/components/form/form-textarea'
import { FormSelect } from '@/components/form/form-select'
import { productSchema, type TProductFormValues } from '../schemas'

const categories = [
  { value: 'electronics', label: 'Elektronika' },
  { value: 'books', label: 'Kitoblar' },
  { value: 'clothing', label: 'Kiyimlar' },
]

interface IProductFormProps {
  onSubmit: (values: TProductFormValues) => void
  isLoading?: boolean
}

export function ProductForm({ onSubmit, isLoading }: IProductFormProps) {
  const { t } = useTranslation()

  const form = useForm<TProductFormValues>({
    resolver: zodResolver(productSchema),
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
          placeholder="Mahsulot nomi"
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
          label="Kategoriya"
          placeholder="Tanlang"
          options={categories}
        />

        <FormTextarea
          control={form.control}
          name="description"
          label={t('products.description')}
          placeholder="Tavsif yozing"
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
