import { Product } from './componenets/Product'
import { useProducts } from './hooks/products'
import { Loader } from './componenets/Loader'

function App() {
  const { loading, error, products } = useProducts()

  return (
    <div className="container mx-auto max-w-2xl pt-5">
      {loading && <Loader />}
      {error && <p className="text-center text-red-600">{error}</p>}
      {products.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </div>
  )
}

export default App
