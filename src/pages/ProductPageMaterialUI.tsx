import React, { useState, useEffect } from 'react'
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
} from '../components/StyledComponents'

// Component
const ProductPageMaterialUI = () => {
  const [offset, setOffset] = useState(0) // Track the current offset.
  const { products, loading, error, fetchProducts } = useProducts()
  const deleteProduct = useDeleteProduct()
  const limit = 1

  // useEffect(() => {
  //   fetchProducts(offset, limit) // Fetch products on offset change
  // }, [offset, fetchProducts])

  useEffect(() => {
    fetchProducts(0, limit) // Always fetch the first batch of products
    setOffset(0) // Reset the offset to ensure updated products are displayed first
  }, [fetchProducts, limit])

  // const handleLoadNext = () => {
  //   // Reset to the first product batch if at the end
  //   if (products.length < limit) {
  //     setOffset(0)
  //   } else {
  //     setOffset((prevOffset) => prevOffset + limit) // Increment offset
  //   }
  // }

  // const handleLoadNext = () => {
  //   setOffset((prevOffset) => prevOffset + limit) // Increment offset to fetch the next batch
  //   // fetchProducts(offset + limit, limit) // Fetch the next product batch.
  // }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id)
        fetchProducts(offset, limit) // Refresh the current batch
      } catch {
        console.error('Failed to delete product')
      }
    }
  }

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Updated Product
      </Typography>

      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}

      {products.map((product) => (
        <StyledCard key={product._id || product.id} variant="outlined">
          <DeleteCross
            onClick={() => handleDelete(product._id || product.id!.toString())}
            aria-label="Delete product"
          >
            &times;
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
