'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';
import { Post } from '@/types/post';

export default function CreatePost() {
  const [content, setContent] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const queryClient = useQueryClient();

  const createPost = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await api.post<Post>('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      setContent('');
      setImages([]);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && images.length === 0) return;

    const formData = new FormData();
    formData.append('content', content);
    images.forEach((image) => {
      formData.append('images', image);
    });

    createPost.mutate(formData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Что у вас нового?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex items-center space-x-4">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer text-sm text-gray-500 hover:text-gray-700"
            >
              Добавить фото
            </label>
            {images.length > 0 && (
              <span className="text-sm text-gray-500">
                Выбрано файлов: {images.length}
              </span>
            )}
          </div>
          <Button
            type="submit"
            disabled={createPost.isPending || (!content.trim() && images.length === 0)}
            className="w-full"
          >
            {createPost.isPending ? 'Публикация...' : 'Опубликовать'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 