import { useEffect, useState, useCallback } from 'react'
import { IProduct } from '../models'
import axios, { AxiosError } from 'axios'

// Accept `id` as a parameter
export function useProducts(id: number) {
  const [products, setProducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchProducts = useCallback(async () => {
    try {
      setError('')
      setLoading(true)

      const response = await axios.get<IProduct[]>(
        `https://fakestoreapi.com/products?limit=${id}`,
      )

      setProducts(response.data)
      setLoading(false)
    } catch (e: unknown) {
      const error = e as AxiosError
      setLoading(false)
      setError(error.message)
    }
  }, [id]) // Include id in the dependency array

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return { products, loading, error }
}
