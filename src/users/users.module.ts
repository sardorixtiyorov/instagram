import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './model/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Follower } from '../follower/model/follower.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Follower])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
