import type { IProduct, TCreateProductInput } from '../types'

const MOCK_PRODUCTS: IProduct[] = [
  {
    id: '1',
    name: 'Laptop',
    price: 999,
    description: 'Zamonaviy noutbuk',
    category: 'electronics',
  },
  {
    id: '2',
    name: 'Kitob',
    price: 25,
    description: 'React dasturlash kitobi',
    category: 'books',
  },
  {
    id: '3',
    name: 'Monitor',
    price: 450,
    description: '27 dyuymli monitor',
    category: 'electronics',
  },
]

let products = [...MOCK_PRODUCTS]

export async function getProducts(): Promise<IProduct[]> {
  await new Promise((r) => setTimeout(r, 500))
  return [...products]
}

export async function createProduct(
  input: TCreateProductInput,
): Promise<IProduct> {
  await new Promise((r) => setTimeout(r, 300))
  const product: IProduct = { ...input, id: String(Date.now()) }
  products = [...products, product]
  return product
}

export async function deleteProduct(id: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 300))
  products = products.filter((p) => p.id !== id)
}
