import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4000/api'
})

export const upload = payload => api.post(`/upload`, payload)
export const validateAddress = payload => api.post(`/validate`, payload)
export const sendEmail = payload => api.post(`/sendemail`, payload)

const apis = {
  upload,
  validateAddress,
  sendEmail
}

export default apis