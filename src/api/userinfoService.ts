import request from '@/utils/request'
import type { Result } from '@/utils/request'

export interface UserInfo {
  id: number
  name: string
  age: number
  email: string
  password: string
  gender: number
  address: string
}

async function login(username: string, password: string): Promise<Result<string>> {
  const response = await request.post<string>(
    '/login',
    { username: username, password: password },
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
  )
  return response.data
}

function getUserInfo(id: number) {
  return request.get<UserInfo>(`/userinfo?id=${id}`)
}

async function updateUserInfo(userInfo: UserInfo) {
  const response = await request.post<UserInfo>('/updateUser', userInfo)
  return response.data
}

function deleteUserInfo(id: number) {
  return request.post<UserInfo>(
    `/delUser`,
    { id: id },
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
  )
}

async function addUserInfo(userInfo: UserInfo) {
  const response = await request.post<UserInfo>('/createUser', userInfo)
  return response.data
}

async function listUserInfo(pageIndex: number, pageSize: number) {
  const response = await request.getPage<UserInfo[]>(
    `/userlist?page=${pageIndex}&limit=${pageSize}`,
  )
  return response.data
}

export default {
  getUserInfo,
  updateUserInfo,
  deleteUserInfo,
  addUserInfo,
  listUserInfo,
  login,
}
