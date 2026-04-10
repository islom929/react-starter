import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../api'
import { PRODUCTS_KEY } from '../constants'

export function useProducts() {
  return useQuery({
    queryKey: PRODUCTS_KEY,
    queryFn: getProducts,
  })
}
