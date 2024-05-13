import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { FindPostByUserIdArgs, PostInputs, PostsResponse, UpdatePostInput } from '../../dto';

@Resolver('Post')
export class PostsResolver {
    constructor(private readonly postsService: PostsService) {}

    @Mutation('createPost')
    create(@Args('createPostInput') createPostInput: PostInputs) {
        return this.postsService.create(createPostInput);
    }

    @Query(() => PostsResponse, { name: 'findPostsByUserId' })
    findByUser(@Args('data') { user_id, skip, limit, page }: FindPostByUserIdArgs): Promise<PostsResponse> {
        return this.postsService.findByUserId({ user_id, skip, limit, page });
    }

    @Query('post')
    findOne(@Args('id') id: number) {
        return this.postsService.findOne(id);
    }

    @Mutation('updatePost')
    update(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
        return this.postsService.update(updatePostInput.id, updatePostInput);
    }

    @Mutation('removePost')
    remove(@Args('id') id: number) {
        return this.postsService.remove(id);
    }
}
