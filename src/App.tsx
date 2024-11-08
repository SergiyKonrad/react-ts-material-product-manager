import React from 'react'
import ProductPage from './pages/ProductPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="container mx-auto max-w-2xl pt-5">
      <ToastContainer />
      <ProductPage />
    </div>
  )
}

export default App
