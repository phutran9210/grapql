import { Injectable } from '@nestjs/common';
import { PostInputs, UpdatePostInput } from "../../dto";
import { Post } from '../../../domain/entity/Post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private postsRepository: Repository<Post>,
    ) {}

    create(createPostInput: PostInputs) {
        return 'This action adds a new post';
    }

    async findByUserId({ user_id, skip, limit, page }) {
        try {
            const [posts, total] = await this.postsRepository.findAndCount({
                where: { user: { id: user_id } },
                relations: ['user'],
                order: { id: 'ASC' },
                skip: (page - 1) * limit,
                take: limit,
            });
            const totalPages = Math.ceil(total / limit);
            return { data: posts, totalPages, currentPage: page, total };
        } catch (error) {
            throw new Error(error);
        }
    }

    async findOne(id: number) {
        try {
            const post = await this.postsRepository.findOne({ where: { id }, relations: ['user'] });
            console.log(post);
            return post;
        } catch (error) {
            throw new Error(error);
        }
    }

    update(id: number, updatePostInput: UpdatePostInput) {
        return `This action updates a #${id} post`;
    }

    remove(id: number) {
        return `This action removes a #${id} post`;
    }
}
