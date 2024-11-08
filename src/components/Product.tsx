import React, { useState } from 'react'
import { IProduct } from '../models'
import { Modal } from './Modal'

interface ProductProps {
  product: IProduct
  onDelete: (id: number) => void
}

export function Product({ product, onDelete }: ProductProps) {
  const [details, setDetails] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const btnBgClassName = details ? 'bg-yellow-400' : 'bg-blue-400'
  const btnClasses = ['border py-2 px-4 rounded', btnBgClassName]

  return (
    <div className="border py-2 px-4 rounded flex flex-col items-center mb-2">
      <img src={product.image} className="w-1/6" alt={product.title} />
      <p>{product.title}</p>
      <p className="font-bold">${product.price}</p>

      <button
        className={btnClasses.join(' ')}
        onClick={() => setDetails((prev) => !prev)}
        aria-label={details ? 'Hide details' : 'Show details'}
      >
        {details ? 'Hide details' : 'Show details'}
      </button>

      {details && (
        <div>
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
              onClick={() => {
                onDelete(product.id)
                setShowDeleteModal(false)
              }}
              className="bg-red-500 text-white p-2 rounded"
              aria-label="Confirm delete"
            >
              Confirm Delete
            </button>
            <button
              onClick={() => setShowDeleteModal(false)}
              className="bg-gray-300 p-2 rounded"
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
