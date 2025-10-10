import axios from 'axios'

const baseURL = 'http://localhost:3001/'

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const axiosInstanceAuthorized = (token: string) => {
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}

// response interceptor to handle global errors
const responseInterceptor = (response: any) => response

const errorInterceptor = (error: any) => {
  // Handle specific status codes
  if (error.response?.status === 401) {
    // invalid token or unauthorized
    localStorage.removeItem('authToken')
    window.location.href = '/login'
  }
  
  if (error.response?.status === 403) {
    console.error('Acesso negado')
  }
  
  if (error.response?.status >= 500) {
    console.error('Erro interno do servidor')
  }
  
  return Promise.reject(error)
}

// apply interceptors
axiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor)