import { PartialType } from "@nestjs/mapped-types";

export class PostInputs {}

export class UpdatePostInput extends PartialType(PostInputs) {
  id: number;
}