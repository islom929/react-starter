import { z } from 'zod'
import type { TFunction } from 'i18next'

export const createProductSchema = (t: TFunction) =>
  z.object({
    name: z.string().min(1, t('products.v.nameRequired')),
    price: z.number().min(0, t('products.v.priceMin')),
    description: z.string().min(1, t('products.v.descriptionRequired')),
    category: z.string().min(1, t('products.v.categoryRequired')),
  })

export type TProductFormValues = z.infer<ReturnType<typeof createProductSchema>>
