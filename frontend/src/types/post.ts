import { User } from './user';

export interface Post {
  id: number;
  content: string;
  images?: string[];
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostDto {
  content: string;
  images?: File[];
}

export interface UpdatePostDto {
  content?: string;
  images?: File[];
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
} 