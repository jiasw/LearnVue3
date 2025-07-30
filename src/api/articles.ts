//  文章管理
import http from './axiosInstance'
import type { BaseResponse } from '../models/BaseResponse'
export interface Article {
  id: number
  title: string
  address: string
  content: string
  imageUrl: string
  adjuncts: string
  // ... other personnel fields
}

export interface PaginatedArticleResponse {
  data: Article[]
  dataCount: number
  pageSize: number
  pageCount: number
}

export const personnelService = {
  getArticleList(params?: {
    pageindex?: number
    pagesize?: number
    keyword?: string
  }): Promise<BaseResponse<PaginatedArticleResponse>> {
    return http.post<BaseResponse<PaginatedArticleResponse>>('/Article/GetGroupNews', { params })
  },

  getArticleById(id: string): Promise<Article> {
    return http.get<Article>(`/Article/GetGroupNewsById?id=${id}`)
  },

  addArticle(data: Omit<Article, 'id'>): Promise<Article> {
    return http.post<Article>('/Mange/AddGroupNews', data)
  },

  updateArticle(id: string, data: Partial<Article>): Promise<Article> {
    return http.put<Article>(`/Mange/UpdateGroupNews`, data)
  },
  delArticle(id: number): Promise<boolean> {
    //定义一个数组
    const arr: number[] = [id]
    const param = { ids: arr }
    return http.del(`/Mange/DeleteGroupNews`, { param })
  },
}
