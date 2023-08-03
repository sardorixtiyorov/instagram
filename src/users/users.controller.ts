import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
  Request,
  HttpCode,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiBody, ApiOperation } from "@nestjs/swagger";
import { Roles } from "src/decorators/roles-auth.decorator";
import { RolesGuard } from "src/guards/roles.guards";
import { JwtAuthGuard } from "../guards/jwt-auth-guard";

@UseGuards(JwtAuthGuard)
@Controller("user")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  
  @HttpCode(200)
  @Post()
  @ApiOperation({
    summary: "We can create users",
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @HttpCode(200)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
