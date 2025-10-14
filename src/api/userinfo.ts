import request from '@/utils/request'
import type { Result } from '@/utils/request'



export interface UserInfo {
  id: number
  name: string
  age: number
  email: string
  password:string
  gender:number
  address:string
}

async function  login(username: string, password: string):  Promise<Result<string>> {
  const response= await request.post<string>(
    '/login',
    { "username": username, "password": password },
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
  )
  return response.data;
}

function getUserInfo(id: number) {
  return request.get<UserInfo>(`/userinfo?id=${id}`);
}

function updateUserInfo(userInfo: UserInfo) {
  return request.put<UserInfo>('/userinfo', userInfo);
}

function deleteUserInfo(id: number) {
  return request.delete<UserInfo>(`/userinfo?id=${id}`);
}

function addUserInfo(userInfo: UserInfo) {
  return request.post<UserInfo>('/userinfo', userInfo);
}

function listUserInfo() {
  return request.get<UserInfo[]>('/userinfo');
}

export default {
  getUserInfo,
  updateUserInfo,
  deleteUserInfo,
  addUserInfo,
  listUserInfo,
  login,
}
