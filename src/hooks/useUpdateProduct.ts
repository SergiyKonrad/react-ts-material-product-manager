import { updateProduct } from '../utils/api'
import { IProduct } from '../models'
import { toast } from 'react-toastify'

export const useUpdateProduct = () => {
  const handleUpdateProduct = async (
    id: string,
    data: Partial<IProduct>,
  ): Promise<IProduct> => {
    try {
      const response = await updateProduct(id, data)
      toast.success('Product updated successfully!', { autoClose: 1000 })
      return response.data // Return updated product data
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error updating product:', error.message)

        // Use error message from the server if available
        if ('response' in error && (error as any).response?.data?.message) {
          toast.error((error as any).response.data.message)
        } else {
          toast.error('Failed to update product')
        }
      } else {
        console.error('Unknown error:', error)
        toast.error('An unexpected error occurred while updating the product.')
      }

      throw error // Re-throw error for the calling component to handle
    }
  }

  return handleUpdateProduct
}
