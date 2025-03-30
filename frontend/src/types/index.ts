export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  content: string;
  images?: string[];
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
} 