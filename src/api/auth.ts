import http from './axiosInstance'
import type { BaseResponse, LoginResponse } from '../models/BaseResponse'

type LoginPayload = {
  username: string
  password: string
}

export const authService = {
  login(payload: LoginPayload): Promise<BaseResponse<LoginResponse>> {
    return http.post<BaseResponse<LoginResponse>>('/Auth/ManageLogin', payload).then((response) => {
      return response
    })
  },
  logout(): Promise<void> {
    // Assuming your backend has a logout endpoint
    return http.post('/auth/logout')
  },
  // You can add more auth-related functions here, e.g., register, refreshToken
}
