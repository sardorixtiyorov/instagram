import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './models/role.model';

@ApiTags('Roles')
// @ApiOperation({ summary: 'Foydalanuvchi yaratish' })

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: 'Role yaratish' })
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRole(createRoleDto);
  }

  @ApiOperation({ summary: "Rolelarni ko'rish" })
  @ApiResponse({ status: 200, description: 'List of Roles', type: [Role] })
  @Get()
  getAllRoles() {
    return this.rolesService.getAllRoles();
  }

  @ApiOperation({ summary: "Roleni value bo'yicha ko'rish" })
  @Get(':value')
  findOne(@Param('value') value: string) {
    return this.rolesService.getRoleByValue(value);
  }
}
