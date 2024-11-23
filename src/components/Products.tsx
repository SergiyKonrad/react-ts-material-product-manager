import React, { useState } from 'react'
import { IProduct } from '../models'
import { Modal } from './Modal'

interface ProductProps {
  product: IProduct
  onDelete: (id: string) => Promise<void>
}

export function Product({ product, onDelete }: ProductProps) {
  const [details, setDetails] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteClick = async () => {
    setIsDeleting(true)
    setShowDeleteModal(false)

    try {
      const productId = product._id || product.id
      if (productId) {
        await onDelete(productId.toString())
      } else {
        console.error('Product ID is undefined')
      }
    } finally {
      setIsDeleting(false)
    }
  }

  const btnBgClassName = details
    ? 'bg-yellow-400 hover:bg-yellow-500'
    : 'bg-blue-400 hover:bg-blue-500'
  const btnClasses = ['border py-2 px-4 rounded', btnBgClassName]

  return (
    <div className="border py-2 px-4 rounded flex flex-col items-center mb-2">
      {/* Product Image */}
      <img
        src={
          product.image ||
          'https://via.placeholder.com/150?text=No+Image+Available'
        }
        className="w-1/6"
        alt={product.name || product.title || 'Product Image'}
      />

      {/* Product Title */}
      <p className="italic text-lg">
        {product.name || product.title || 'No Title Available'}
      </p>

      {/* Product Price */}
      <p className="font-bold text-lg">
        ${product.price?.toFixed(2) || 'Price Not Available'}
      </p>

      {/* Show/Hide Details Button */}
      <button
        className={btnClasses.join(' ')}
        onClick={() => setDetails((prev) => !prev)}
        aria-label={details ? 'Hide product details' : 'Show product details'}
      >
        {details ? 'Hide Details' : 'Show Details'}
      </button>

      {/* Product Rating Details */}
      {details && (
        <div className="text-center mt-2">
          <p>{product.description || 'No description available'}</p>
          {product.rating ? (
            <p>
              Rate: <span className="font-bold">{product.rating.rate}</span>
            </p>
          ) : (
            <p>Rating not available</p>
          )}
        </div>
      )}

      {/* Delete Button */}
      <button
        className="bg-red-500 text-white p-2 mt-2 rounded hover:bg-red-600"
        onClick={() => setShowDeleteModal(true)}
        aria-label="Delete this product"
      >
        Delete Product
      </button>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <Modal>
          <p>Are you sure you want to delete this product?</p>
          <div className="flex justify-between mt-4">
            <button
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded w-full mr-2 flex items-center justify-center"
              onClick={handleDeleteClick}
              disabled={isDeleting}
              aria-label="Confirm delete"
            >
              {isDeleting ? (
                <span className="loader mr-2">Loading...</span>
              ) : (
                'Confirm Delete'
              )}
            </button>
            <button
              onClick={() => setShowDeleteModal(false)}
              className="bg-gray-300 hover:bg-gray-400 text-black p-2 rounded w-full"
              aria-label="Cancel delete action"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}
