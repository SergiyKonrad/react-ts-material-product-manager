import { useEffect, useState } from 'react'
import { IProduct } from '../models'
import axios, { AxiosError } from 'axios'

// Accept `id` as a parameter
export function useProducts(id: number) {
  const [products, setProducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Fetch products based on `id`
  async function fetchProducts() {
    try {
      setError('')
      setLoading(true)

      const response = await axios.get<IProduct[]>(
        `https://fakestoreapi.com/products?limit=${id}`, // Use the id in the API request
      )

      setProducts(response.data)
      setLoading(false)
    } catch (e: unknown) {
      const error = e as AxiosError
      setLoading(false)
      setError(error.message)
    }
  }

  // Watch for changes in `id` and re-fetch the products
  useEffect(() => {
    fetchProducts()
  }, [id]) // Dependency array includes `id` to re-run the effect when it changes

  return { products, loading, error }
}
