import { Post } from '../../posts/entities/post.entity';
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    avatar: string;
    posts: Post[];
    createdAt: Date;
    updatedAt: Date;
}
