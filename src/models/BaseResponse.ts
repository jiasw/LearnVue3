export interface BaseResponse<T> {
  success: boolean
  message: string
  data: T
}
export interface UserInfo {
  sex: string
  userID: number
  nickName: string
  phoneNumber: string
  email: string
  avatar: string
}

export interface LoginResponse {
  sysUser: UserInfo
  token: string
}
