//  文章管理
import http from './axiosInstance';

export interface Article {
  id: number;
  title: string;
  address: string;
  content: string;
  imageUrl:string;
  adjuncts:string
  // ... other personnel fields
}

export interface PaginatedArticleResponse {
  data: Article[];
  total: number;
  page: number;
  limit: number;
}

export const personnelService = {
  getArticleList(params?: { pageindex?: number; pagesize?: number; keyword?: string }): Promise<PaginatedArticleResponse> {
    return http.get<PaginatedArticleResponse>('/Article/GetGroupNews', { params });
  },

  getArticleById(id: string): Promise<Article> {
    return http.get<Article>(`/Article/GetGroupNewsById?id=${id}`);
  },

  addArticle(data: Omit<Article, 'id'>): Promise<Article> {
    return http.post<Article>('/Mange/AddGroupNews', data);
  },

  updateArticle(id: string, data: Partial<Article>): Promise<Article> {
    return http.put<Article>(`/Mange/UpdateGroupNews`, data);
  },
  delArticle(id: number): Promise<any> {
    //定义一个数组
    const arr: number[] = [id];
    let param={"ids":arr};
    return http.del(`/Mange/DeleteGroupNews`,{param});
  },

  
};