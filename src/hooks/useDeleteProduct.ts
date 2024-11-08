import axios from 'axios'
import { toast } from 'react-toastify'

export const useDeleteProduct = () => {
  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(`/product/${id}`)
      toast.success('Product deleted successfully!')
    } catch (error) {
      toast.error('Failed to delete product')
      console.error(error)
    }
  }

  return deleteProduct
}
