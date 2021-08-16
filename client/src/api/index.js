import axios from 'axios'

const api = axios.create({
  baseURL = 'http://localhost:3000/api'
})

export const upload = payload => api.post(`/upload`, payload)
export const validateAddress = payload => api.post(`/validateAddress`, payload)

const apis = {
  upload,
  validateAddress
}

export default apis