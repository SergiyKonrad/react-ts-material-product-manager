//  former Product Page...

import React, { useState, useEffect, useCallback } from 'react'
import { IProduct } from '../models'
import { Product } from '../components/Products'
import { useProducts } from '../hooks/useProducts'
import EditProductModal from '../components/EditProductModal'
import { useDeleteProduct } from '../hooks/useDeleteProduct'
import { Loader } from '../components/Loader'
import { toast } from 'react-toastify'
import { ErrorMessage } from '../components/ErrorMessage'
import DynamicButton from '../components/DynamicButton'
import {
  ButtonWrapper,
  buttonStyles,
  Spinner,
} from '../components/StyledComponents'

const ProductsList = () => {
  const { products, loading, error, fetchProducts } = useProducts()
  const deleteProduct = useDeleteProduct()
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null)
  const [offset, setOffset] = useState(0)
  const limit = 5 // Number of products per batch

  const emptyLabel = 'Back to First Product'
  const nonEmptyLabel = 'Get Another Products'
  const isEmpty = products.length === 0

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchProducts(offset, limit)
    }, 300) // Debounce by 300ms

    return () => clearTimeout(timeoutId)
  }, [offset, fetchProducts, limit])

  const openEditModal = useCallback((product: IProduct) => {
    setSelectedProduct(product)
    setEditModalOpen(true)
  }, [])

  const closeEditModal = useCallback(() => {
    setSelectedProduct(null)
    setEditModalOpen(false)
    fetchProducts(offset, limit)
  }, [fetchProducts, limit, offset])

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await deleteProduct(id)
        const updatedOffset = Math.max(offset - limit, 0)
        await fetchProducts(updatedOffset, limit, true)
        setOffset(updatedOffset)
      } catch (error) {
        console.error('Failed to delete product:', error)
      }
    },
    [deleteProduct, fetchProducts, limit, offset],
  )

  const handleLoadNext = useCallback(() => {
    if (products.length < limit) {
      toast.info(
        <p>
          <strong>If no products are available, add one to get started!</strong>
        </p>,
        { autoClose: 4000 },
      )
      setOffset(0)
    } else {
      setOffset((prevOffset) => prevOffset + limit)
    }
  }, [products.length, limit])

  return (
    <div>
      <h1 className="text-center text-4xl mb-4 mt-0">Products</h1>
      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}

      {products.map((product) => (
        <div key={product._id || product.id} className="mb-4">
          <Product product={product} onDelete={handleDelete} />

          {/* Edit Button */}
          <button
            className="bg-green-500 text-white p-2 mt-2 rounded hover:bg-green-600"
            onClick={() => openEditModal(product)}
            aria-label="Edit product"
          >
            Edit Product
          </button>
        </div>
      ))}

      {/* Edit Product Modal */}
      {isEditModalOpen && selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={closeEditModal}
          limit={limit}
        />
      )}

      {/* Get Another Product Button */}
      {/* Pagination Button */}

      <ButtonWrapper style={buttonStyles}>
        <DynamicButton
          isEmpty={isEmpty}
          variant="contained"
          onClick={() => {
            requestAnimationFrame(() => {
              handleLoadNext()

              // Scroll to the top of the screen
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            })
          }}
          disabled={loading}
          aria-label={isEmpty ? emptyLabel : nonEmptyLabel} // Dynamic aria-label
        >
          {loading ? (
            <Spinner /> // Keeps the spinner for the loading state
          ) : (
            <>{isEmpty ? emptyLabel : nonEmptyLabel}</>
          )}
        </DynamicButton>
      </ButtonWrapper>
    </div>
  )
}

export default ProductsList

// Or fetch products whenever the offset changes.
// useEffect(() => {
//   fetchProducts(offset, limit)
// }, [offset, fetchProducts, limit])

// useEffect(() => {
//   fetchProducts(0, limit) // in order to always fetch the first batch of products
//   setOffset(0)
// }, [fetchProducts, limit])

//  Optional approach to apply the DynamicButton
// const handleLoadNext = () => {
//   setOffset((prevOffset) => prevOffset + limit)
// }
