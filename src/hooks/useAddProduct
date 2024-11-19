import axios from 'axios'
import { toast } from 'react-toastify'
import { IProduct } from '../models'

export const useAddProduct = () => {
  const addProduct = async (product: Omit<IProduct, 'id' | '_id'>) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/product`, product)
      toast.success('Product added successfully!')
    } catch (error) {
      toast.error('Failed to add product')
      console.error(error)
    }
  }

  return addProduct
}
