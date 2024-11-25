import React, { useState, useEffect } from 'react'
import { Product } from '../components/Products'
import { useProducts } from '../hooks/useProducts'
import { useDeleteProduct } from '../hooks/useDeleteProduct'
import { Loader } from '../components/Loader'
import { ErrorMessage } from '../components/ErrorMessage'
import EditProductModal from '../components/EditProductModal' // Import the modal component
import { IProduct } from '../models' // Import the product interface.
import DynamicButton from '../components/DynamicButton'
import { ButtonWrapper } from '../components/StyledComponents'

const ProductPage = () => {
  const { products, loading, error, fetchProducts } = useProducts()
  const deleteProduct = useDeleteProduct()
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null)
  const [offset, setOffset] = useState(0) // Track the current offset
  const limit = 3 // Number of products per batch

  // Fetch products whenever the offset changes
  useEffect(() => {
    fetchProducts(offset, limit)
  }, [offset, fetchProducts, limit])

  // useEffect(() => {
  //   fetchProducts(0, limit) // Always fetch the first batch of products
  //   setOffset(0) // Reset the offset to ensure updated products are displayed first
  // }, [fetchProducts, limit])

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
        await deleteProduct(id)
        fetchProducts(offset, limit) // Refresh product list after deletion
      } catch {
        console.error('Failed to delete product:', error)
      }
    }
  }

  // Load the next batch of products
  const handleLoadNext = () => {
    if (products.length < limit) {
      // if (products.length === 0) {
      alert('No more products. Resetting to the first batch.')
      setOffset(0) // Reset to the first batch if at the end
    } else {
      setOffset((prevOffset) => prevOffset + limit) // Increment offset
    }
  }

  //  --- or use this approach instead to apply the DynamicButton ---
  // const handleLoadNext = () => {
  //   setOffset((prevOffset) => prevOffset + limit)
  // }

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
        <ButtonWrapper>
          <DynamicButton
            isEmpty={products.length === 0}
            variant="contained"
            onClick={handleLoadNext}
            // disabled={loading || products.length === 0}
            disabled={loading}
          >
            {products.length === 0
              ? 'Back to First Product'
              : 'Get Another Product'}
          </DynamicButton>
        </ButtonWrapper>
      </div>
    </div>
  )
}

export default ProductPage

/*
import React, { useState } from 'react'
import { Product } from '../components/Products'
import { useProducts } from '../hooks/useProducts'
import { useDeleteProduct } from '../hooks/useDeleteProduct'
import { Loader } from '../components/Loader'
import { ErrorMessage } from '../components/ErrorMessage'
import EditProductModal from '../components/EditProductModal';
import { IProduct } from '../models';

const ProductPage = () => {
  const [id, setId] = useState(5) // Control number of products to fetch
  const { products, loading, error, fetchProducts } = useProducts()
  const deleteProduct = useDeleteProduct()

  const handleIdChange = () => {
    setId((prevId) => prevId + 1) // Increment ID for fetching more products
    fetchProducts() // Fetch updated products
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id)
        fetchProducts() // Refresh product list after deletion
      } catch {
        console.error('Failed to delete product')
      }
    }
  }

  return (
    <div>
      <h1 className="text-center text-3xl font-bold mb-4 mt-0">Products</h1>
      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}
      {products.map((product) => (
        <Product
          key={product.id || product._id}
          product={product}
          onDelete={handleDelete}
        />
      ))}
      <button
        onClick={handleIdChange}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
      >
        Load Next Product (ID: {id})
      </button>
    </div>
  )
}

export default ProductPage

*/
