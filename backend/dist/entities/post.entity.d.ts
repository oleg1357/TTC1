import { User } from './user.entity';
export declare class Post {
    id: string;
    content: string;
    images?: string[];
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
