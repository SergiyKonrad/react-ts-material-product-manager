import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { showSuccess, showError } from '../components/ToastNotification' // Import helpers
import { Box, TextField, Button } from '@mui/material'

const AddProductPage = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
      image: '',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required('Title is required')
        .max(30, 'Max 30 characters'),
      description: Yup.string()
        .required('Description is required')
        .max(200, 'Max 200 characters'),
      price: Yup.number()
        .required('Price is required')
        .min(1, 'Price must be greater than 0')
        .max(9999, 'Price must be less than 10,000'),
      image: Yup.string().required('Image URL is required'),
    }),
    onSubmit: async (values) => {
      try {
        console.log('Product added:', values) // Replace with API call
        showSuccess('Product added successfully!')
        formik.resetForm()
      } catch (error) {
        console.error('Error adding product:', error)
        showError('Failed to add product')
      }
    },
  })

  return (
    <Box sx={{ padding: 4, maxWidth: '600px', margin: '0 auto' }}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          name="title"
          label="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          margin="normal"
        />
        <TextField
          fullWidth
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
        />
        <TextField
          fullWidth
          name="price"
          label="Price"
          type="number"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
          margin="normal"
        />
        <TextField
          fullWidth
          name="image"
          label="Image URL"
          value={formik.values.image}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.image && Boolean(formik.errors.image)}
          helperText={formik.touched.image && formik.errors.image}
          margin="normal"
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
