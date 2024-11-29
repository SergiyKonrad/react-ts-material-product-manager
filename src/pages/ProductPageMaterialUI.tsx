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
  const [offset, setOffset] = useState(0)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false) // Track if modal is open
  const [productToDelete, setProductToDelete] = useState<string | null>(null) // Track the product ID
  const [productNameToDelete, setProductNameToDelete] = useState<string | null>(
    null,
  ) // Track the product name
  const { products, loading, error, fetchProducts } = useProducts()
  const deleteProduct = useDeleteProduct()
  const limit = 1

  useEffect(() => {
    let isMounted = true // Prevent state updates on unmounted components

    const fetchInitialProducts = async () => {
      try {
        await fetchProducts(0, limit)
        if (isMounted) {
          setOffset(0)
        }
      } catch (error) {
        console.error('Error fetching initial products:', error)
      }
    }

    fetchInitialProducts()

    return () => {
      isMounted = false // Clean up
    }
  }, [fetchProducts, limit])

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

  const confirmDelete = (id: string, productName?: string) => {
    setProductToDelete(id)
    setProductNameToDelete(productName || null)
    setDeleteModalOpen(true) // Open the modal
  }

  // const handleConfirmDelete = async () => {
  //   if (productToDelete) {
  //     await handleDelete(productToDelete)
  //   }
  //   setDeleteModalOpen(false)
  // }

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      setDeleteModalOpen(false) // Close the modal immediately
      try {
        await handleDelete(productToDelete) // Calls the hook, which handles deletion and toast feedback
      } catch (error) {
        console.error('Deletion failed:', error)
      }
    }
  }

  const handleCancelDelete = () => {
    setDeleteModalOpen(false) // Close the modal without deleting.
  }

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

      {/* Modal for delete confirmation */}
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
