import React, { useState } from 'react'
import { Product } from '../components/Products'
// import { ProductList } from '../components/ProductList'
import { useProducts } from '../hooks/useProducts'
import { useDeleteProduct } from '../hooks/useDeleteProduct'
// import { showSuccess, showError } from '../components/ToastNotification'
import { Loader } from '../components/Loader'
import { ErrorMessage } from '../components/ErrorMessage'

const ProductPage = () => {
  const [id, setId] = useState(1) // Control number of products to fetch
  const { products, loading, error, fetchProducts } = useProducts(id)

  const deleteProduct = useDeleteProduct() // Using the function from the hook

  const handleIdChange = () => {
    setId((prevId) => prevId + 1)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id.toString()) // Calling the function from the hook
        fetchProducts() // Refresh product list after deletion
        // showSuccess('Product deleted successfully!')
      } catch {
        console.log('Failed to delete product')
        // showError('Failed to delete product')
      }
    }
  }

  return (
    // <>
    <div>
      <h1 className="text-center text-3xl font-bold mb-4 mt-0">Products</h1>
      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}
      {products.map((product) => (
        <Product
          key={product.id}
          product={product}
          onDelete={() => handleDelete(product.id.toString())}
        />
      ))}

      <button
        onClick={handleIdChange}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
      >
        Load Next Product (ID: {id})
      </button>
    </div>

    // --- additional ProductList section if needed ---
    // <div>
    //   <h2 className="text-center text-2xl font-bold mb-4">Product List</h2>
    //   {loading && <Loader />}
    //   {error && <ErrorMessage error={error} />}
    //   <ProductList products={products} onDelete={handleDelete} />
    // </div>
    // </>
  )
}

export default ProductPage

// NB.  Hooks (like useDeleteProduct) are designed to be called at the top level of a component, not inside functions or events.
// React enforces this rule to ensure consistent hook behavior across renders, which is why we first call useDeleteProduct() at the top level and assign it to deleteProduct.
