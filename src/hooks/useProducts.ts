import { useEffect, useState, useCallback } from 'react'
import { IProduct } from '../models'
import axios, { AxiosError } from 'axios'

export function useProducts() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [cache, setCache] = useState<Record<string, IProduct[]>>({}) // Cache object.

  const fetchProducts = useCallback(
    async (
      offset: number = 0,
      limit: number = 5,
      forceUpdate: boolean = false,
    ) => {
      const cacheKey = `${offset}-${limit}`

      // Skip cache for fresh fetch after updates
      if (cache[cacheKey] && !forceUpdate) {
        setProducts(cache[cacheKey])
        return
      }

      setLoading(true)
      setError('')

      try {
        const response = await axios.get<IProduct[]>(
          `${process.env.REACT_APP_API_URL}/products?offset=${offset}&limit=${limit}`,
        )
        setCache((prevCache) => ({ ...prevCache, [cacheKey]: response.data })) // Store in cache
        setProducts(response.data)
      } catch (e: unknown) {
        const axiosError = e as AxiosError
        setError(axiosError.message || 'Failed to fetch products')
      } finally {
        setLoading(false)
      }
    },
    [cache],
  )

  useEffect(() => {
    fetchProducts() // Fetch products on initial render
  }, [fetchProducts])

  return { products, loading, error, fetchProducts }
}
