import React from 'react'
// import ProductPage from './pages/ProductPage'
import ProductPageMaterialUI from './pages/ProductPageMaterialUI'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    // <div className="container mx-auto max-w-2xl pt-5">
    //   <ToastContainer />
    //   <ProductPage />
    //   <ProductPageMaterialUI />

    <div className="container mx-auto pt-5 space-y-5">
      <ToastContainer />

      {/* Apply consistent width */}
      {/* <div className="max-w-2xl mx-auto p-8">
        <ProductPage />
      </div> */}
      <div className="max-w-2xl mx-auto">
        <ProductPageMaterialUI />
      </div>
    </div>
  )
}

export default App
