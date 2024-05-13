import { Field, ObjectType, PartialType } from "@nestjs/graphql";
import { IPaginationResponse } from '../common.input';
import { Post } from "../../../domain/entity/Post.entity";

class PartialPostInput extends PartialType(Post) {}

@ObjectType()
export class PostsResponse extends IPaginationResponse {
    @Field(() => [PartialPostInput])
    data: PartialPostInput[];
}
