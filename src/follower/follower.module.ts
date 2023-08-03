import { Module } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { FollowerController } from './follower.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Follower } from './model/follower.model';

@Module({
  imports: [SequelizeModule.forFeature([Follower])],
  controllers: [FollowerController],
  providers: [FollowerService],
})
export class FollowerModule {}
