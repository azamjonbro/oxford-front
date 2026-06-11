import axios from 'axios'

export const BACKEND_URL = 'https://oxford.techinfo.uz'
// export const BACKEND_URL = 'http://localhost:5890'


const api = axios.create({
  baseURL: `${BACKEND_URL}/api/`
})

export default api
