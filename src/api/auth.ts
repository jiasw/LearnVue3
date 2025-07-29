import http from './axiosInstance';
interface LoginPayload {
  username: string;
  password: string;
}


interface LoginResponse {
  token: string;
  userId: string;
  // ... any other user data
}

export const authService = {
  login(payload: LoginPayload): Promise<LoginResponse> {
    return http.post<LoginResponse>('/auth/login', payload).then(response => response);
  },
  logout(): Promise<any> {
    // Assuming your backend has a logout endpoint
    return http.post('/auth/logout');
  },
  // You can add more auth-related functions here, e.g., register, refreshToken
};