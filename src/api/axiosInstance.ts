// src/api/axiosInstance.ts
import axios from 'axios'
import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios'

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL || '/api', // Your API base URL
  timeout: 10000, // Request timeout
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
service.interceptors.request.use(
  (config) => {
    // For example, add authorization token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  },
)

// Response interceptor
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // You can handle global success responses here, e.g., check for specific status codes
    return response.data // Often, you only need the data part of the response
  },
  (error: AxiosError) => {
    console.error('Response error:', error)
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Unauthorized: e.g., redirect to login page
          console.error('未认证, 请重新登录.')
          // Optionally, redirect to login: router.push('/login');
          break
        case 403:
          // Forbidden: e.g., show a message about insufficient permissions
          console.error('无权限访问该资源.')
          break
        case 404:
          // Not Found
          console.error('资源不存在.')
          break
        case 500:
          // Server Error
          console.error('服务器错误.')
          break
        default:
          console.error(`Error: ${error.response.status} - ${error.response.statusText}`)
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('未收到服务器响应.')
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error in request setup:', error.message)
    }
    return Promise.reject(error)
  },
)
/**
 * 封装get方法
 * @param url 请求地址
 * @param params 请求参数
 * @returns Promise
 */
function get<T, Params = Record<string, unknown>>(url: string, params?: Params): Promise<T> {
  return service.get(url, { params })
}

/**
 * 封装post方法
 * @param url 请求地址
 * @param data 请求数据
 * @returns Promise
 */
function post<T, Data = Record<string, unknown>>(url: string, data?: Data): Promise<T> {
  return service.post(url, data)
}

/**
 * 封装put方法
 * @param url 请求地址
 * @param data 请求数据
 * @returns Promise
 */
function put<T, Data = Record<string, unknown>>(url: string, data?: Data): Promise<T> {
  return service.put(url, data)
}

/**
 * 封装delete方法
 * @param url 请求地址
 * @returns Promise
 */
function del<T, Params = Record<string, unknown>>(url: string, params?: Params): Promise<T> {
  return service.delete(url, { params })
}

export default { get, put, post, del }
