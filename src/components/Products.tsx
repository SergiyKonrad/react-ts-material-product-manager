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
    try {
      await onDelete(product.id.toString())
    } finally {
      setIsDeleting(false)
      setShowDeleteModal(false)
    }
  }

  const btnBgClassName = details ? 'bg-yellow-400' : 'bg-blue-400'
  const btnClasses = ['border py-2 px-4 rounded', btnBgClassName]

  return (
    <div className="border py-2 px-4 rounded flex flex-col items-center mb-2">
      <img src={product.image} className="w-1/6" alt={product.title} />
      <p className="italic">{product.title}</p>
      <p className="font-bold">${product.price}</p>

      <button
        className={btnClasses.join(' ')}
        // --- or Inline Ternary Logic
        // className={`border py-2 px-4 rounded ${
        //   details ? 'bg-yellow-400' : 'bg-blue-400'
        // }`}
        onClick={() => setDetails((prev) => !prev)}
        aria-label={details ? 'Hide details' : 'Show details'}
      >
        {details ? 'Hide details' : 'Show details'}
      </button>

      {details && (
        <div className="text-center mt-2">
          <p>{product.description}</p>
          <p>
            Rate: <span className="font-bold">{product.rating.rate}</span>
          </p>
        </div>
      )}

      <button
        className="bg-red-500 text-white p-2 mt-2 rounded"
        onClick={() => setShowDeleteModal(true)}
        aria-label="Delete product"
      >
        Delete Product
      </button>

      {showDeleteModal && (
        <Modal>
          <p>Are you sure you want to delete this product?</p>
          <div className="flex justify-between mt-4">
            <button
              onClick={handleDeleteClick}
              className="bg-red-500 text-white p-2 rounded w-full mr-2 flex items-center justify-center"
              disabled={isDeleting}
              aria-label="Confirm delete"
            >
              {isDeleting ? (
                <span className="loader mr-2">Loading...</span> // Spinner text or icon
              ) : (
                'Confirm Delete'
              )}
            </button>
            <button
              onClick={() => setShowDeleteModal(false)}
              className="bg-gray-300 text-black p-2 rounded w-full"
              aria-label="Cancel delete"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}
