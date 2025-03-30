import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isAuthenticated() {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('token');
}

export function redirectToLogin() {
  if (typeof window === 'undefined') return;
  window.location.href = '/login';
}
