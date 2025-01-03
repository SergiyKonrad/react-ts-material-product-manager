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
    const [isDeleting, setIsDeleting] = useState<string | null>(null)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [productToDelete, setProductToDelete] = useState<string | null>(null)
    const [productNameToDelete, setProductNameToDelete] = useState<
        string | null
    >(null)

    const limit = 1 // Always fetch one product at a time

    // Fetch one product (the most recent or single)
    useEffect(() => {
        const fetchSingleProduct = async () => {
            try {
                await fetchProducts(0, limit) // Fetch only one product
            } catch (error) {
                console.error('Error fetching product:', error)
            }
        }
        fetchSingleProduct()
    }, [fetchProducts, limit])

    // Handle delete operation
    const handleDelete = useCallback(
        async (id: string) => {
            setIsDeleting(id)
            try {
                await deleteProduct(id)
                await fetchProducts(0, limit, true) // Refresh the page to fetch the latest product
            } catch (error) {
                console.error('Failed to delete product:', error)
            } finally {
                setIsDeleting(null)
            }
        },
        [deleteProduct, fetchProducts, limit],
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
            setDeleteModalOpen(false)
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

            {/* Render a single product if available */}
            {products.length > 0 && (
                <StyledCard
                    key={products[0]._id || products[0].id}
                    variant="outlined"
                >
                    <DeleteCross
                        onClick={() =>
                            confirmDelete(
                                products[0]._id || products[0].id!.toString(),
                                products[0].name,
                            )
                        }
                        aria-label="Delete product"
                        disabled={
                            isDeleting === (products[0]._id || products[0].id)
                        }
                    >
                        {isDeleting === (products[0]._id || products[0].id) ? (
                            <Spinner />
                        ) : (
                            <>&times;</>
                        )}
                    </DeleteCross>
                    <StyledImage
                        src={products[0].image}
                        alt={products[0].name || products[0].title}
                    />
                    <CardContent>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ fontStyle: 'italic' }}
                        >
                            {products[0].name || products[0].title}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                        >
                            {products[0].description}
                        </Typography>
                        <Typography variant="h6" color="text.primary">
                            ${products[0].price.toFixed(2)}
                        </Typography>
                    </CardContent>
                </StyledCard>
            )}

            {/* Handle empty state */}
            {products.length === 0 && !loading && !error && (
                <Typography
                    variant="body2"
                    align="center"
                    color="text.secondary"
                >
                    No product available. Please add a product.
                </Typography>
            )}

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
