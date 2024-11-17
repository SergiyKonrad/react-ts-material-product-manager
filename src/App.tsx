import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom'
import ProductPage from './pages/ProductPage'
import ProductPageMaterialUI from './pages/ProductPageMaterialUI'
import AddProductPage from './pages/AddProductPage'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <Router>
      <div className="container mx-auto pt-5 px-4 space-y-5">
        <ToastContainer />

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-around space-x-2 mb-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-700 font-bold underline'
                : 'text-blue-500 hover:underline'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/product-page"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 font-bold underline'
                : 'text-blue-500 hover:underline'
            }
          >
            Product Page
          </NavLink>
          <NavLink
            to="/add-product"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 font-bold underline'
                : 'text-blue-500 hover:underline'
            }
          >
            Add Product
          </NavLink>
        </nav>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<ProductPageMaterialUI />} />
          <Route path="/product-page" element={<ProductPage />} />
          <Route path="/add-product" element={<AddProductPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
