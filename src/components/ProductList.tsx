import React from 'react'
import { IProduct } from '../models'
import { Product } from './Products'

interface ProductListProps {
  products: IProduct[]
  onDelete: (id: string) => Promise<void>
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
        onDelete={async () => await onDelete(product.id.toString())} // Wrap in async function
      />
    ))}
  </div>
)
