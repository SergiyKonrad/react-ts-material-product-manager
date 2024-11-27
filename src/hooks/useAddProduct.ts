import axios from 'axios'
import { toast } from 'react-toastify'
import { IProduct } from '../models'

export const useAddProduct = () => {
  const addProduct = async (product: Omit<IProduct, 'id' | '_id'>) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/product`,
        product,
      )

      if (response.status === 201) {
        // Only show success if the response is successful
        toast.success('Product added successfully!', { autoClose: 2000 })
      } else {
        throw new Error('Failed to add product')
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.message)
      } else {
        console.error('Unknown error:', error)
      }
      toast.error('Failed to add product', { autoClose: 2000 })
    }
  }

  return addProduct
}
