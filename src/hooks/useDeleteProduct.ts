import axios from 'axios'
import { toast } from 'react-toastify'

const DEBUG = false // Set to true to see notifications

export const useDeleteProduct = () => {
  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(`/product/${id}`)
      if (DEBUG) toast.success('Product deleted successfully!')
    } catch (error) {
      if (DEBUG) toast.error('Failed to delete product')
      console.error(error)
    }
  }

  return deleteProduct
}

// NB. The function 'useDeleteProduct' handles the API call to delete the product from the backend, and any toast notifications or error handling specific to the deletion process can also be managed here.
