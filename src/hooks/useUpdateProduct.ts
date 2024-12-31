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

            // Log the response to verify the updated product details.
            // console.log('API Response:', response.data)

            toast.success('Product edited successfully!', { autoClose: 1000 })
            return response.data // Return updated product data
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error updating product:', error.message)

                // Use error message from the server if available
                if (
                    'response' in error &&
                    (error as any).response?.data?.message
                ) {
                    toast.error((error as any).response.data.message)
                } else {
                    toast.error(
                        'Failed to edit product.Please try again later.',
                        {
                            autoClose: 3000,
                        },
                    )
                }
            } else {
                console.error('Unknown error:', error)
                toast.error(
                    'An unexpected error occurred while updating the product.',
                )
            }

            throw error // Re-throw error for the calling component to handle
        }
    }

    return handleUpdateProduct
}
