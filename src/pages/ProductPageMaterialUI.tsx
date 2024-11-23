import React, { useState, useEffect } from 'react'
import { useProducts } from '../hooks/useProducts'
import { useDeleteProduct } from '../hooks/useDeleteProduct'
import { Loader } from '../components/Loader'
import { ErrorMessage } from '../components/ErrorMessage'
import { Card, CardContent, Typography, Button, Box } from '@mui/material'
import { styled } from '@mui/material/styles'

import DynamicButton from '../components/DynamicButton'

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

  objectFit: 'contain',
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

const ButtonWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '8px !important',
  marginBottom: '32px !important',
})

// const LoadNextButton = styled(Button)({
//   marginTop: '16px',
// })

// Component
const ProductPageMaterialUI = () => {
  const [offset, setOffset] = useState(0) // Track the current offset.
  const { products, loading, error, fetchProducts } = useProducts()
  const deleteProduct = useDeleteProduct()
  const limit = 4

  useEffect(() => {
    fetchProducts(offset, limit) // Fetch products on offset change
  }, [offset, fetchProducts])

  const handleLoadNext = () => {
    // Reset to the first product batch if at the end
    if (products.length < limit) {
      setOffset(0)
    } else {
      setOffset((prevOffset) => prevOffset + limit) // Increment offset
    }
  }

  //  --- or use this approach instead to apply the DynamicButton ---
  // const handleLoadNext = () => {
  //   setOffset((prevOffset) => prevOffset + limit)
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
    <>
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Products
        </Typography>

        {loading && <Loader />}
        {error && <ErrorMessage error={error} />}

        {products.map((product) => (
          <StyledCard key={product._id || product.id} variant="outlined">
            <DeleteCross
              onClick={() =>
                handleDelete(product._id || product.id!.toString())
              }
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

      <ButtonWrapper>
        <DynamicButton
          isEmpty={products.length === 0}
          variant="contained"
          onClick={handleLoadNext}
          disabled={products.length === 0}
        >
          {products.length === 0 ? 'No More Products' : 'Get Another Products'}
        </DynamicButton>
      </ButtonWrapper>
    </>
  )
}
export default ProductPageMaterialUI
