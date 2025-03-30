import { User } from '../../users/entities/user.entity';
export declare class Post {
    id: string;
    content: string;
    images: string[];
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
