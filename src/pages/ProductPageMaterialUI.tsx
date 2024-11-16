import React, { useState } from 'react'
import { useProducts } from '../hooks/useProducts'
import { useDeleteProduct } from '../hooks/useDeleteProduct'
import { showSuccess, showError } from '../components/ToastNotification'
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
})

const StyledImage = styled('img')({
  height: '120px',
  width: '80px',
  objectFit: 'cover',
  margin: '20px auto 0',
})

const DeletetButton = styled(Button)({
  marginBottom: '16px',
})

const LoadNextButton = styled(Button)({
  padding: '8px',
})

const ProductPageMaterialUI = () => {
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
          <DeletetButton
            variant="contained"
            color="error"
            onClick={() => handleDelete(product.id.toString())}
          >
            Delete
          </DeletetButton>
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
