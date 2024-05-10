import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../../domain/entity/User.entity";
import { Role } from "../../../domain/entity/Role.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [RolesResolver, RolesService],
})
export class RolesModule {}
