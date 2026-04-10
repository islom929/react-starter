import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(1, 'Nom kiritish shart'),
  price: z.number().min(0, "Narx 0 dan katta bo'lishi kerak"),
  description: z.string().min(1, 'Tavsif kiritish shart'),
  category: z.string().min(1, 'Kategoriya tanlash shart'),
})

export type TProductFormValues = z.infer<typeof productSchema>
