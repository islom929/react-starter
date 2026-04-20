import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProduct } from '../api'
import type { TCreateProductInput } from '../types'
import { productsKeys } from '../constants'

export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: TCreateProductInput) => createProduct(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productsKeys.base })
    },
  })
}
