import { Product } from './componenets/Product'
import { useProducts } from './hooks/products'
import { Loader } from './componenets/Loader'
import { ErrorMessage } from './componenets/ErrorMessage'
import { Modal } from './componenets/Modal'

function App() {
  const { loading, error, products } = useProducts()

  return (
    <div className="container mx-auto max-w-2xl pt-5">
      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}
      {products.map((product) => (
        <Product product={product} key={product.id} />
      ))}

      <Modal />
    </div>
  )
}

export default App
