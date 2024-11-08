import React from 'react'
import { IProduct } from '../models'
import { Product } from './Product'

interface ProductListProps {
  products: IProduct[]
  onDelete: (id: string) => void
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  onDelete,
}) => (
  <div>
    {products.map((product) => (
      <Product
        key={product.id}
        product={product}
        onDelete={() => onDelete(product.id.toString())}
      />
    ))}
  </div>
)
