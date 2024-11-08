import axios from 'axios'

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api', // Use env variable
})

export const getProducts = () => API.get('/products')
export const addProduct = (data: any) => API.post('/product', data)
export const deleteProduct = (id: number) => API.delete(`/product/${id}`)
export const updateProduct = (id: number, data: any) =>
  API.put(`/product/${id}`, data)

export default API
