'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, LogOut } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className={cn(
                'flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors',
                pathname === '/' && 'text-blue-600 font-medium'
              )}
            >
              <Home className="h-5 w-5" />
              <span>Главная</span>
            </Link>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
            className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Выйти</span>
          </button>
        </div>
      </div>
    </nav>
  );
} 