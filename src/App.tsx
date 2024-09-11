import React, { useEffect, useState } from 'react'
import { Product } from './componenets/Product'
import { products } from './data/products'
import axios from 'axios'
import { IProduct } from './modules'

function App() {
  const [products, setProducts] = useState<IProduct[]>([])

  async function fetchProducts() {
    const response = await axios.get<IProduct[]>(
      'https://fakestoreapi.com/products?limit=5',
    )
    setProducts(response.data)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="container mx-auto max-w-2xl pt-5">
      {products.map((product) => (
        <Product product={product} key={product.id} />
      ))}

      {/* <Product product={products[0]} />
      <Product product={products[1]} /> */}
    </div>
  )
}

export default App
