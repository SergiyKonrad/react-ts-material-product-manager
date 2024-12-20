import React, { useState, useEffect, useCallback } from 'react'
import { useProducts } from '../hooks/useProducts'
import { useDeleteProduct } from '../hooks/useDeleteProduct'
import { Loader } from '../components/Loader'
import { ErrorMessage } from '../components/ErrorMessage'
import ModalDelete from '../components/ModalDelete'
import { CardContent, Typography } from '@mui/material'
import {
  Container,
  StyledCard,
  StyledImage,
  DeleteCross,
  Spinner,
} from '../components/StyledComponents'

const ProductPageMaterialUI = () => {
  const { products, loading, error, fetchProducts } = useProducts()
  const deleteProduct = useDeleteProduct()
  const [offset, setOffset] = useState(0)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)
  const [productNameToDelete, setProductNameToDelete] = useState<string | null>(
    null,
  )
  const limit = 1

  // Fetch products with debounce to avoid redundant requests
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const fetchDebouncedProducts = async () => {
        try {
          await fetchProducts(offset, limit)
        } catch (error) {
          console.error('Error fetching products:', error)
        }
      }
      fetchDebouncedProducts()
    }, 300)

    return () => clearTimeout(timeoutId) // Clean up the timeout on re-renders or unmount
  }, [fetchProducts, offset, limit])

  // Handle delete operation
  const handleDelete = useCallback(
    async (id: string) => {
      setIsDeleting(id)
      try {
        await deleteProduct(id)
        const updatedOffset = Math.max(offset - limit, 0)
        await fetchProducts(updatedOffset, limit, true)
        setOffset(updatedOffset)
      } catch (error) {
        console.error('Failed to delete product:', error)
      } finally {
        setIsDeleting(null)
      }
    },
    [deleteProduct, fetchProducts, limit, offset],
  )

  // Confirm delete by opening the modal
  const confirmDelete = useCallback((id: string, productName?: string) => {
    setProductToDelete(id)
    setProductNameToDelete(productName || null)
    setDeleteModalOpen(true)
  }, [])

  // Handle modal confirmation for delete
  const handleConfirmDelete = useCallback(async () => {
    if (productToDelete) {
      setDeleteModalOpen(false) // Close the modal immediately
      try {
        await handleDelete(productToDelete)
      } catch (error) {
        console.error('Deletion failed:', error)
      }
    }
  }, [handleDelete, productToDelete])

  // Cancel delete operation and close the modal
  const handleCancelDelete = useCallback(() => {
    setDeleteModalOpen(false)
  }, [])

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
            onClick={() =>
              confirmDelete(product._id || product.id!.toString(), product.name)
            }
            aria-label="Delete product"
            disabled={isDeleting === (product._id || product.id)}
          >
            {isDeleting === (product._id || product.id) ? (
              <Spinner />
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

      <ModalDelete
        open={deleteModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        productName={productNameToDelete || undefined}
      />
    </Container>
  )
}

export default ProductPageMaterialUI

// // Fetch products when the component mounts and when offset changes
// useEffect(() => {
//   const fetchInitialProducts = async () => {
//     try {
//       await fetchProducts(offset, limit)
//     } catch (error) {
//       console.error('Error fetching products:', error)
//     }
//   }
//   fetchInitialProducts()
// }, [fetchProducts, offset, limit])
