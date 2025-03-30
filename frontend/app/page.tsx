'use client';

import { useState } from 'react';
import CreatePost from '@/components/CreatePost';
import PostList from '@/components/PostList';
import UserProfile from '@/components/UserProfile';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'feed' | 'profile'>('feed');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
              activeTab === 'feed'
                ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Лента
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
              activeTab === 'profile'
                ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Профиль
          </button>
        </div>

        {activeTab === 'feed' ? (
          <div className="space-y-8">
            <CreatePost />
            <PostList />
          </div>
        ) : (
          <UserProfile />
        )}
      </div>
    </div>
  );
} 