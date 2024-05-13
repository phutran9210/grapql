import { InputType, PartialType } from "@nestjs/graphql";
import { Post } from "../../../domain/entity/Post.entity";

@InputType()
export class RoleInputs {}

@InputType()
export class UpdateRoleInput extends PartialType(RoleInputs) {
  id: number;
}
