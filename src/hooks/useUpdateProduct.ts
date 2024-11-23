import { updateProduct } from '../utils/api'
import { toast } from 'react-toastify'
import { IProduct } from '../models'

export const useUpdateProduct = () => {
  const handleUpdateProduct = async (
    id: string,
    data: Partial<IProduct>,
  ): Promise<IProduct> => {
    try {
      const response = await updateProduct(id, data)
      toast.success('Product updated successfully!')
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

// import { updateProduct } from '../utils/api'
// import { toast } from 'react-toastify'
// import { IProduct } from '../models'

// export const useUpdateProduct = () => {
//   const handleUpdateProduct = async (id: string, data: Partial<IProduct>) => {
//     try {
//       const response = await updateProduct(id, data)
//       toast.success('Product updated successfully!')
//       return response.data // Return updated product data for further use if needed
//     } catch (error) {
//       toast.error('Failed to update product')
//       console.error(error)
//       throw error // Re-throw error for the calling component to handle
//     }
//   }

//   return handleUpdateProduct
// }
