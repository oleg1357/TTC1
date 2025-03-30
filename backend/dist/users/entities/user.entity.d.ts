import { Post } from '../../posts/entities/post.entity';
export declare class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    dateOfBirth: Date;
    avatar: string;
    bio: string;
    posts: Post[];
    createdAt: Date;
    updatedAt: Date;
}
