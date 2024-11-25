import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom'
import ProductsList from './pages/ProductsList'
import ProductPageMaterialUI from './pages/ProductPageMaterialUI'
import AddProductPage from './pages/AddProductPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true, // To opt-in for React 18 transitions
        v7_relativeSplatPath: true, // To fix relative path behavior for splat routes
      }}
    >
      <div className="container mx-auto pt-5 px-4 space-y-5">
        <ToastContainer />

        {/* Navigation Links */}
        {/* <nav className="flex justify-between max-w-2xl mx-auto mb-4"> */}
        <nav className="flex justify-around mb-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 font-bold underline'
                : 'text-blue-500 hover:underline'
            }
          >
            Product
          </NavLink>

          <NavLink
            to="/product-page"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 font-bold underline'
                : 'text-blue-500 hover:underline'
            }
          >
            Products List
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
          <Route path="/product-page" element={<ProductsList />} />
          <Route path="/add-product" element={<AddProductPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
