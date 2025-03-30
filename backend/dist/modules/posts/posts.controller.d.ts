import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostEntity } from './entities/post.entity';
import { User } from '../users/entities/user.entity';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(createPostDto: CreatePostDto, user: User): Promise<PostEntity>;
    findAll(userId: string): Promise<PostEntity[]>;
    findOne(id: string): Promise<PostEntity>;
    remove(id: string): Promise<void>;
}
