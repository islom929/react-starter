export interface IProduct {
  id: string
  name: string
  price: number
  description: string
  category: string
}

export type TCreateProductInput = Omit<IProduct, 'id'>
