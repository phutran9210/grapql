import { InputType, Int, Field, PartialType } from '@nestjs/graphql';
import { IsEmail, IsString, Length } from 'class-validator';

@InputType()
export class UserInputs {
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
    @Length(4, 20)
    displayName: string;
}

@InputType()
export class UpdateUserInput extends PartialType(UserInputs) {
    @Field()
    username: string;

    @Field()
    displayName: string;
}
