/*
import React, { useState, useEffect } from 'react'
import { useProducts } from '../hooks/useProducts'
import { useDeleteProduct } from '../hooks/useDeleteProduct'
import { showSuccess, showError } from '../components/ToastNotification'
import { Loader } from '../components/Loader'
import { ErrorMessage } from '../components/ErrorMessage'
import { Card, CardContent, Typography, Button, Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { getProducts } from '../utils/api'

// Styled components
const Container = styled(Box)({
  padding: '32px',
})

const StyledCard = styled(Card)({
  marginBottom: '16px',
  textAlign: 'center',
  position: 'relative',
})

const StyledImage = styled('img')({
  height: '120px',
  width: '80px',
  objectFit: 'cover',
  margin: '20px auto 0',
})

const DeleteCross = styled(Button)({
  position: 'absolute',
  top: '8px',
  right: '8px',
  color: '#fff',
  backgroundColor: '#f44336',
  borderRadius: '50%',
  minWidth: '24px',
  height: '24px',
  lineHeight: '24px',
  fontSize: '16px',
  fontWeight: 'bold',
  padding: 0,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#d32f2f',
  },
})

const LoadNextButton = styled(Button)({
  padding: '8px',
})

// components

const ProductPageMaterialUI = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProducts()
        console.log(response.data) // Log fetched products
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchData()
  }, [])

  const [id, setId] = useState(1) // Control number of products to fetch
  const { products, loading, error, fetchProducts } = useProducts(id)
  const deleteProduct = useDeleteProduct()

  const handleIdChange = () => {
    setId((prevId) => prevId + 1)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id.toString())
        fetchProducts() // Refresh product list after deletion
        showSuccess('Product deleted successfully!')
      } catch {
        showError('Failed to delete product')
      }
    }
  }

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Products
      </Typography>

      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}

      {products.map((product) => (
        <StyledCard key={product.id} variant="outlined">
          <DeleteCross
            onClick={() => handleDelete(product.id.toString())}
            aria-label="Delete product"
          >
            &times;
          </DeleteCross>

          <StyledImage src={product.image} alt={product.title} />
          <CardContent>
            <Typography variant="h5" component="div">
              {product.title}
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

      <LoadNextButton
        variant="contained"
        color="primary"
        onClick={handleIdChange}
      >
        Load Next Product (ID: {id})
      </LoadNextButton>
    </Container>
  )
}

export default ProductPageMaterialUI

*/

import React from 'react'
import { useProducts } from '../hooks/useProducts'
import { useDeleteProduct } from '../hooks/useDeleteProduct'
import { Loader } from '../components/Loader'
import { ErrorMessage } from '../components/ErrorMessage'
import { Card, CardContent, Typography, Button, Box } from '@mui/material'
import { styled } from '@mui/material/styles'

// Styled components
const Container = styled(Box)({
  padding: '32px',
})

const StyledCard = styled(Card)({
  marginBottom: '16px',
  textAlign: 'center',
  position: 'relative',
})

const StyledImage = styled('img')({
  height: '120px',
  width: '80px',
  objectFit: 'cover',
  margin: '20px auto 0',
})

const DeleteCross = styled(Button)({
  position: 'absolute',
  top: '8px',
  right: '8px',
  color: '#fff',
  backgroundColor: '#f44336',
  borderRadius: '50%',
  minWidth: '24px',
  height: '24px',
  lineHeight: '24px',
  fontSize: '16px',
  fontWeight: 'bold',
  padding: 0,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#d32f2f',
  },
})

// Component
const ProductPageMaterialUI = () => {
  const { products, loading, error, fetchProducts } = useProducts()
  const deleteProduct = useDeleteProduct()

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
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Products
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

          <StyledImage src={product.image} alt={product.title} />
          <CardContent>
            <Typography variant="h5" component="div">
              {product.title}
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
