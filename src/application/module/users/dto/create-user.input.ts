import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsString, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
    @Field()
    @IsString()
    @Length(4, 20)
    username: string;

    @Field()
    @IsString()
    @Length(4, 20)
    password: string;

    @Field()
    @IsString()
    @IsEmail()
    @Length(4, 20)
    displayName: string;
}
