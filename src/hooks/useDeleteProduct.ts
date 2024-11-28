import axios from 'axios'
import { toast } from 'react-toastify'

export const useDeleteProduct = () => {
  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/product/${id}`)
      toast.success('Product deleted successfully!', { autoClose: 2000 })
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.message === 'Network Error') {
        toast.error('Network Error: Failed to connect to the server!', {
          autoClose: 2000,
        })
      } else {
        toast.error('Failed to delete product!', { autoClose: 2000 })
      }
      console.error(error)
    }
  }

  return deleteProduct
}

// NB. The function 'useDeleteProduct' handles the API call to delete the product from the backend, and any toast notifications or error handling specific to the deletion process can also be managed here.
