import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import { initialUser } from './initial-user';

async function registerInitialUser() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  try {
    const existingUser = await usersService.findByEmail(initialUser.email);
    if (existingUser) {
      console.log('Начальный пользователь уже существует');
      return;
    }

    const userData = {
      ...initialUser,
      birthDate: new Date(initialUser.birthDate),
    };

    await usersService.create(userData);
    console.log('Начальный пользователь успешно создан');
    console.log('Email:', initialUser.email);
    console.log('Пароль:', initialUser.password);
  } catch (error) {
    console.error('Ошибка при создании начального пользователя:', error);
  } finally {
    await app.close();
  }
}

registerInitialUser(); 