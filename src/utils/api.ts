import axios from 'axios'

// Added log to verify the value in production
// console.log('API URL:', process.env.REACT_APP_API_URL)

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api', // Use the environment variable
})

export const getProducts = () => API.get('/products')
export const addProduct = (data: any) => API.post('/product', data)

export const deleteProduct = (id: string) => API.delete(`/product/${id}`)
export const updateProduct = (id: string, data: any) =>
  API.put(`/product/${id}`, data)

export default API

// export const deleteProduct = (id: number) => API.delete(`/product/${id}`)
// export const updateProduct = (id: number, data: any) =>
//   API.put(`/product/${id}`, data)
