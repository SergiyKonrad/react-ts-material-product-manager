// NB. Modal window with custom toast notification for editing products in the Products List page.

import React, { useCallback } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useUpdateProduct } from '../hooks/useUpdateProduct'
import { useProducts } from '../hooks/useProducts'
import { IProduct } from '../models'
import { toast } from 'react-toastify'
import ToastMessage from '../components/ToastMessage'
import { Spinner } from './StyledComponents'

interface EditProductModalProps {
  product: IProduct
  onClose: () => void
  limit: number
}

const EditProductModal = ({
  product,
  onClose,
  limit,
}: EditProductModalProps) => {
  const updateProduct = useUpdateProduct()
  const { fetchProducts } = useProducts() // Import fetchProducts here

  const formik = useFormik<{
    name: string
    description: string
    price: number
    image: string
  }>({
    initialValues: {
      name: product.name || '',
      description: product.description || '',
      price: product.price || 0,
      image: product.image || '',
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .required('Name is required')
        .min(1, 'Name must be at least 1 character')
        .max(50, 'Name must not exceed 50 characters')
        .matches(
          /^[a-zA-Z0-9.,!'’\- ]{1,50}$/,
          'Invalid characters in product name',
        ),

      description: Yup.string()
        .required('Description is required')
        .min(10, 'Description must be at least 10 characters')
        .max(200, 'Description must not exceed 200 characters')
        .matches(
          /^[a-zA-Z0-9.,!'’+\-\n ]{10,200}$/,
          'Invalid characters in product description',
        ),

      price: Yup.number()
        .required('Price is required')
        .min(1, 'Price must be greater than 0')
        .max(9999, 'Price must be less than 10000')
        .typeError('Price must be a valid number'),

      image: Yup.string()
        .required('Image URL is required')
        .url('Invalid URL format'),
    }),

    onSubmit: useCallback(
      async (values) => {
        // Compare current values with initial product values
        if (
          values.name === product.name &&
          values.description === product.description &&
          values.price === product.price &&
          values.image === product.image
        ) {
          // alert('No changes were made.')
          toast.info('No changes were made.', {
            autoClose: 2000,
          }) // Using a toast for better UX
          return
        }

        try {
          await updateProduct(product._id || product.id!.toString(), values)
          fetchProducts(0, limit, true) // Refresh the product list

          // NB. Custom toast notification with navigation support
          // Can be  removed if navigating to the same page
          toast.info(
            <ToastMessage message="Go to Product page to see updated product..." />,
          )
          onClose()
        } catch (error) {
          console.error('Error updating product:', error)
          // toast.error('Failed to update product. Please try again.', {
          //   autoClose: 2000,
          // })
        }
      },
      [fetchProducts, limit, onClose, product, updateProduct],
    ),
  })

  return (
    <div className="fixed bg-black/50 top-0 right-0 left-0 bottom-0 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Edit Product</h2>
        <form onSubmit={formik.handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mb-1">{formik.errors.name}</p>
            )}
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border rounded px-3 py-2 mb-3"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter product name"
              autoComplete="on"
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-sm mb-1">
                {formik.errors.description}
              </p>
            )}
            <textarea
              id="description"
              name="description"
              className="w-full border rounded px-3 py-2 mb-3"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Product Description"
              autoComplete="off"
            />
          </div>

          {/* Price */}
          <div className="mb-3">
            {formik.touched.price && formik.errors.price && (
              <p className="text-red-500 text-sm mb-1">{formik.errors.price}</p>
            )}
            <input
              type="number"
              id="price"
              name="price"
              className="w-full border rounded px-3 py-2 mb-3"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Product Price"
              autoComplete="off"
            />
          </div>

          {/* Image URL */}
          <div className="mb-3">
            {formik.touched.image && formik.errors.image && (
              <p className="text-red-500 text-sm mb-1">{formik.errors.image}</p>
            )}
            <input
              type="text"
              id="image"
              name="image"
              className="w-full border rounded px-3 py-2 mb-3"
              value={formik.values.image}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Image URL"
              autoComplete="off"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6 justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              disabled={formik.isSubmitting} // Disable button while form is submitting
              aria-label="Save changes"
            >
              {formik.isSubmitting ? <Spinner /> : 'Save'}
            </button>
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded w-full focus:outline-none focus:ring focus:ring-gray-400"
              onClick={onClose}
              aria-label="Cancel and close modal"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProductModal

// Added <{ name: string; description: string; price: number; image: string }> to useFormik to explicitly define the shape of the values object.

// Optional
/* .matches(
        /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)$/,
        'Image URL must be a valid link to an image (e.g., .jpg, .png)',
      ),*/
