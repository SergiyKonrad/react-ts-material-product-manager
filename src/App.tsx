import { useState } from 'react'
import { useProducts } from './hooks/products'
import { Product } from './components/Product'
import { Loader } from './components/Loader'
import { ErrorMessage } from './components/ErrorMessage'
// import { Modal } from './componenets/Modal'

function App() {
  const [id, setId] = useState(1)
  const { loading, error, products } = useProducts(id)

  const handleIdChange = () => {
    setId((prevId) => prevId + 1)
  }

  return (
    <div className="container mx-auto max-w-2xl pt-5">
      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}
      {products.map((product) => (
        <Product product={product} key={product.id} />
      ))}

      <button
        onClick={handleIdChange}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
      >
        Load Next Product (ID: {id})
      </button>

      {/* <Modal /> */}
    </div>
  )
}

export default App
