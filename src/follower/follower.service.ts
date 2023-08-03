import { Injectable } from '@nestjs/common';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { UpdateFollowerDto } from './dto/update-follower.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Follower } from './model/follower.model';
import { User } from '../users/model/user.model';

@Injectable()
export class FollowerService {
  constructor(
    @InjectModel(Follower) private readonly followerRepo: typeof Follower,
  ) {}

  follow(userId: number, followerId: number) {
    return this.followerRepo.create({
      user_id: userId,
      subscribed_user_id: followerId,
    });
  }

  unFollow(userId: number, followerId: number) {
    return this.followerRepo.destroy({
      where: {
        user_id: userId,
        subscribed_user_id: followerId,
      },
    });
  }

  // user obuna bo'lgan
  findFollowing(id: number) {
    return this.followerRepo.findAll({
      where: {
        user_id: id,
      },
      include: {
        all: true,
      },
    });
  }

  // userga obuna bo'lgan
  findFollower(id: number) {
    return this.followerRepo.findAll({
      where: {
        subscribed_user_id: id,
      },
      include: [User],
    });
  }
}
