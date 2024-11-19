export interface IProduct {
  id?: number // Optional for compatibility with external APIs
  _id?: string // MongoDB uses `_id`
  title: string
  price: number
  description: string
  category?: string // Optional, depending on usage
  image: string
  rating?: {
    rate: number
    count: number
  }
}
