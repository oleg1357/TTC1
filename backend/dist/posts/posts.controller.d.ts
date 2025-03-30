import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(createPostDto: CreatePostDto, userId: string, files: Express.Multer.File[]): Promise<import("./entities/post.entity").Post>;
    findAll(userId: string, page?: number, limit?: number): Promise<{
        posts: import("./entities/post.entity").Post[];
        total: number;
    }>;
    findOne(id: string): Promise<import("./entities/post.entity").Post>;
    update(id: string, updatePostDto: UpdatePostDto): Promise<import("./entities/post.entity").Post>;
    remove(id: string): Promise<void>;
}
