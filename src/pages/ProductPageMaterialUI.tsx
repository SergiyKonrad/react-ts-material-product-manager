import React, { useState, useEffect, useCallback } from 'react'
import { useProducts } from '../hooks/useProducts'
import { useDeleteProduct } from '../hooks/useDeleteProduct'
import { Loader } from '../components/Loader'
import { ErrorMessage } from '../components/ErrorMessage'
import { CardContent, Typography } from '@mui/material'

import {
  Container,
  StyledCard,
  StyledImage,
  DeleteCross,
  Spinner,
} from '../components/StyledComponents'

// Component
const ProductPageMaterialUI = () => {
  const [offset, setOffset] = useState(0) // Track the current offset.
  const [isDeleting, setIsDeleting] = useState<string | null>(null) // Track the ID of the product being deleted.
  const { products, loading, error, fetchProducts } = useProducts()
  const deleteProduct = useDeleteProduct()
  const limit = 1

  useEffect(() => {
    fetchProducts(0, limit) // Always fetch the first batch of products.
    setOffset(0) // Reset the offset to ensure updated products are displayed first.
  }, [fetchProducts, limit])

  const handleDelete = useCallback(
    async (id: string) => {
      if (window.confirm('Are you sure you want to delete this product?')) {
        setIsDeleting(id) // Set the current product as being deleted.

        try {
          await deleteProduct(id) // Call the delete API.
          const updatedOffset = Math.max(offset - limit, 0) // Calculate the new offset.
          await fetchProducts(updatedOffset, limit, true) // Fetch the updated product list.
          setOffset(updatedOffset) // Update the offset state.
        } catch (error) {
          console.error('Failed to delete product:', error)
        } finally {
          setIsDeleting(null) // Reset the deleting state.
        }
      }
    },
    [deleteProduct, fetchProducts, limit, offset],
  )

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Updated or Added Product
      </Typography>

      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}

      {products.map((product) => (
        <StyledCard key={product._id || product.id} variant="outlined">
          <DeleteCross
            onClick={() => handleDelete(product._id || product.id!.toString())}
            aria-label="Delete product"
            disabled={isDeleting === (product._id || product.id)} // Disable if this product is being deleted.
          >
            {isDeleting === (product._id || product.id) ? (
              <Spinner /> // Show spinner while deleting.
            ) : (
              <>&times;</>
            )}
          </DeleteCross>

          <StyledImage
            src={product.image}
            alt={product.name || product.title}
          />
          <CardContent>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontStyle: 'italic' }}
            >
              {product.name || product.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {product.description}
            </Typography>
            <Typography variant="h6" color="text.primary">
              ${product.price.toFixed(2)}
            </Typography>
          </CardContent>
        </StyledCard>
      ))}
    </Container>
  )
}

export default ProductPageMaterialUI
