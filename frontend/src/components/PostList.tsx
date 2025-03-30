'use client';

import { useState } from 'react';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Post, PaginatedResponse } from '@/types/post';
import { Trash2, MoreVertical } from 'lucide-react';

interface PostListProps {
  userId?: string;
}

export default function PostList({ userId }: PostListProps) {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<PaginatedResponse<Post>>({
    queryKey: ['posts', userId],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const url = userId ? `/posts/user/${userId}` : '/posts';
      const response = await api.get<PaginatedResponse<Post>>(url, {
        params: { page: pageParam, limit: 10 },
      });
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });

  const deletePost = useMutation({
    mutationFn: async (postId: number) => {
      await api.delete(`/posts/${postId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  if (!data) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {data.pages.map((page) =>
        page.items.map((post) => (
          <Card key={post.id} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-x-4 pb-2">
              <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.user.avatar} />
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {post.user.firstName[0]}
                    {post.user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold text-gray-900">
                    {post.user.firstName} {post.user.lastName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {format(new Date(post.createdAt), 'd MMMM yyyy, HH:mm', { locale: ru })}
                  </p>
                </div>
              </div>
              <button
                onClick={() => deletePost.mutate(post.id)}
                className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-100"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-gray-800">{post.content}</p>
              {post.images && post.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {post.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Изображение ${index + 1}`}
                      className="rounded-lg object-cover w-full h-48 hover:opacity-90 transition-opacity"
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))
      )}
      {hasNextPage && (
        <div className="flex justify-center">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            {isFetchingNextPage ? 'Загрузка...' : 'Загрузить еще'}
          </Button>
        </div>
      )}
    </div>
  );
} 