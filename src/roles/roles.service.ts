import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/role.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(createRoleDto: CreateRoleDto) {
    const newRole = await this.roleRepository.create(createRoleDto);
    return newRole;
  }

  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({ where: { value } });
    return role;
  }

  async getAllRoles() {
    const roles = await this.roleRepository.findAll({ include: { all: true } });
    return roles;
  }
}
