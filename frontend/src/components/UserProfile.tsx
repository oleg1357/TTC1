'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { User } from '@/types/user';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Camera, Loader2 } from 'lucide-react';

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    bio: '',
    phone: '',
  });
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await api.get<User>('/users/me');
      return response.data;
    },
  });

  const updateProfile = useMutation({
    mutationFn: async (data: Partial<User>) => {
      const response = await api.patch<User>('/users/me', data);
      return response.data;
    },
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile.mutate(formData);
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const formData = new FormData();
    formData.append('avatar', e.target.files[0]);

    try {
      await api.patch('/users/me/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    } catch (error) {
      console.error('Ошибка при загрузке аватара:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <Card>
      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <CardTitle>Профиль</CardTitle>
          <Button
            variant="outline"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Отмена' : 'Редактировать'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={user.avatar || '/default-avatar.png'}
                alt="Аватар"
                className="w-24 h-24 rounded-full object-cover"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer">
                  <Camera className="h-4 w-4 text-gray-600" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <div>
              <p className="text-lg font-semibold">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Имя</Label>
              <Input
                id="firstName"
                value={isEditing ? formData.firstName : user.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Фамилия</Label>
              <Input
                id="lastName"
                value={isEditing ? formData.lastName : user.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthDate">Дата рождения</Label>
            <Input
              id="birthDate"
              type="date"
              value={isEditing ? formData.birthDate : user.birthDate}
              onChange={(e) =>
                setFormData({ ...formData, birthDate: e.target.value })
              }
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Телефон</Label>
            <Input
              id="phone"
              value={isEditing ? formData.phone : user.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">О себе</Label>
            <Textarea
              id="bio"
              value={isEditing ? formData.bio : user.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              disabled={!isEditing}
            />
          </div>

          {isEditing && (
            <Button type="submit" className="w-full">
              Сохранить изменения
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
} 