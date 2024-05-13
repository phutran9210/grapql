import { Field, Int, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class IPaginationResponse {
    @Field(() => Int)
    totalPages: number;

    @Field(() => Int)
    currentPage: number;

    @Field(() => Int)
    total: number;
}
