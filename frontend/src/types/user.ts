export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  birthDate?: string;
  bio?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  bio?: string;
  phone?: string;
} 