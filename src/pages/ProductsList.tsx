import React, { useState, useEffect } from 'react'
import { IProduct } from '../models'
import { Product } from '../components/Products'
import { useProducts } from '../hooks/useProducts'
import EditProductModal from '../components/EditProductModal'
import { useDeleteProduct } from '../hooks/useDeleteProduct'
import { Loader } from '../components/Loader'
import { ErrorMessage } from '../components/ErrorMessage'
import DynamicButton from '../components/DynamicButton'
import {
  ButtonWrapper,
  buttonStyles,
  Spinner,
} from '../components/StyledComponents'

const ProductPage = () => {
  const { products, loading, error, fetchProducts } = useProducts()
  const deleteProduct = useDeleteProduct()
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null)
  const [offset, setOffset] = useState(0)
  const limit = 5 // Number of products per batch

  // Fetch products whenever the offset changes
  useEffect(() => {
    fetchProducts(offset, limit)
  }, [offset, fetchProducts, limit])

  const openEditModal = (product: IProduct) => {
    setSelectedProduct(product)
    setEditModalOpen(true)
  }

  const closeEditModal = () => {
    setSelectedProduct(null)
    setEditModalOpen(false)
    fetchProducts(offset, limit) // Refresh products after editing
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id) // API call to delete the product
        const updatedOffset = Math.max(offset - limit, 0)
        await fetchProducts(updatedOffset, limit, true)
        setOffset(updatedOffset)
      } catch (error) {
        console.error('Failed to delete product:', error)
      }
    }
  }

  // Load the next batch of products
  const handleLoadNext = () => {
    if (products.length < limit) {
      alert('No more products. Resetting to the first batch.')
      setOffset(0)
    } else {
      setOffset((prevOffset) => prevOffset + limit)
    }
  }

  return (
    <div>
      <h1 className="text-center text-4xl mb-4 mt-0">Products</h1>
      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}
      {products.map((product) => (
        <div key={product._id || product.id} className="mb-4">
          <Product product={product} onDelete={handleDelete} />

          {/* Add the Edit button */}
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

      <div>
        <ButtonWrapper style={buttonStyles}>
          <DynamicButton
            isEmpty={products.length === 0}
            variant="contained"
            onClick={() => {
              requestAnimationFrame(() => handleLoadNext())
            }}
            disabled={loading}
            aria-label={
              products.length === 0
                ? 'Back to First Product'
                : 'Get Another Products'
            }
          >
            {loading ? (
              <Spinner />
            ) : (
              <>
                {products.length === 0
                  ? 'Back to First Product'
                  : 'Get Another Products'}
              </>
            )}
          </DynamicButton>
        </ButtonWrapper>
      </div>
    </div>
  )
}

export default ProductPage

// useEffect(() => {
//   fetchProducts(0, limit) // in order to always fetch the first batch of products
//   setOffset(0)
// }, [fetchProducts, limit])

//  --- optional approach to apply the DynamicButton
// const handleLoadNext = () => {
//   setOffset((prevOffset) => prevOffset + limit)
// }
