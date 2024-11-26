import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Box, TextField, Button } from '@mui/material'
import { useAddProduct } from '../hooks/useAddProduct'
import { useNavigate } from 'react-router-dom'

const AddProductPage = () => {
  const navigate = useNavigate()
  const addProduct = useAddProduct() // Using the custom hook for adding products

  const formik = useFormik({
    initialValues: {
      name: '', // Changed from title to name
      description: '',
      price: '',
      image: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Name or Title is required')
        .min(1, 'Name must be at least 1 character')
        .max(50, 'Name must not exceed 50 characters')
        .matches(
          /^[a-zA-Z0-9.,!'’\- ]{1,50}$/,
          'Invalid characters in product name',
        ),
      description: Yup.string()
        .required('Description is required')
        .min(10, 'Description must be at least 10 characters')
        .max(200, 'Description must not exceed 200 characters')
        .matches(
          /^[a-zA-Z0-9.,!'’+\- ]{10,200}$/,
          'Invalid characters in product description',
        ),
      price: Yup.number()
        .required('Price is required')
        .min(1, 'Price must be greater than 0')
        .max(9999, 'Price must be less than 10,000')
        .typeError('Price must be a valid number'),

      image: Yup.string().url('Invalid URL format').notRequired(), // Makes the field optional
      // .required('Image URL is required'),
    }),

    onSubmit: async (values) => {
      try {
        const newProduct = {
          name: values.name, //  for primary identification
          title: values.name, // Map `name` to `title` for backward compatibility
          description: values.description,
          price: Number(values.price),
          image: values.image,
        }

        await addProduct(newProduct) // Add product using the hook
        navigate('/')
        // navigate('/product-page') // to go to ProductPage (Products List)

        formik.resetForm()
      } catch (error) {
        console.error('Error adding product:', error)
        // showError('Failed to add product')
      }
    },
  })

  return (
    <Box sx={{ padding: 4, maxWidth: '600px', margin: '0 auto' }}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          margin="normal"
          // autoComplete="name"
          autoComplete="on"
        />
        <TextField
          fullWidth
          id="description"
          name="description"
          label="Description"
          multiline
          rows={4}
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
          margin="normal"
          autoComplete="off"
        />
        <TextField
          fullWidth
          id="price"
          name="price"
          label="Price"
          type="number"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
          margin="normal"
          autoComplete="off"
        />
        <TextField
          fullWidth
          id="image"
          name="image"
          label="Image URL (optional)"
          value={formik.values.image}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.image && Boolean(formik.errors.image)}
          helperText={formik.touched.image && formik.errors.image}
          margin="normal"
          autoComplete="on"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Add Product
        </Button>
      </form>
    </Box>
  )
}

export default AddProductPage
