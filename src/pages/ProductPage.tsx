import React, { useState, useEffect } from 'react'
import { Product } from '../components/Products'
import { useProducts } from '../hooks/useProducts'
import { useDeleteProduct } from '../hooks/useDeleteProduct'
import { Loader } from '../components/Loader'
import { ErrorMessage } from '../components/ErrorMessage'
import EditProductModal from '../components/EditProductModal' // Import the modal component
import { IProduct } from '../models' // Import the product interface.

const ProductPage = () => {
  const { products, loading, error, fetchProducts } = useProducts()
  const deleteProduct = useDeleteProduct()
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null)

  useEffect(() => {
    fetchProducts(0, 3) // Fetch 3 products
  }, [fetchProducts])

  const openEditModal = (product: IProduct) => {
    setSelectedProduct(product)
    setEditModalOpen(true)
  }

  const closeEditModal = () => {
    setSelectedProduct(null)
    setEditModalOpen(false)
    fetchProducts(0, 3) // Refresh products after editing
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id)
        fetchProducts(0, 3) // Refresh product list after deletion
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
        <EditProductModal product={selectedProduct} onClose={closeEditModal} />
      )}
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
