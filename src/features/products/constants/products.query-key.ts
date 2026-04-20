const BASE = 'products'

export const productsKeys = {
  base: [BASE] as const,
  list: [BASE, 'list'] as const,
  detail: (id: string) => [BASE, 'detail', id] as const,
}
