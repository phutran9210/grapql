import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsOptional, Min } from 'class-validator';

@ArgsType()
export class FindPostByUserIdArgs {
    @Field(() => Int)
    @Min(1)
    user_id: number;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @Min(1)
    page?: number;

    @Field(() => Int, { nullable: true })
    @Min(1)
    @IsOptional()
    limit?: number;

    @Field(() => Int, { nullable: true })
    @Min(1)
    @IsOptional()
    skip?: number;
}
