import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteProduct } from '../api'
import { PRODUCTS_KEY } from '../constants'

export function useDeleteProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_KEY })
    },
  })
}
