import { Injectable } from '@nestjs/common';
import { RoleInputs, UpdateRoleInput } from "../../dto";

@Injectable()
export class RolesService {
  create(createRoleInput: RoleInputs) {
    return 'This action adds a new role';
  }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleInput: UpdateRoleInput) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
