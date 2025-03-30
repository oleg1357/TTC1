import { Post } from './post.entity';
export declare class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
    posts: Post[];
}
