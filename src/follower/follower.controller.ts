import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FollowerService } from './follower.service';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { UpdateFollowerDto } from './dto/update-follower.dto';
import { JwtAuthGuard } from '../guards/jwt-auth-guard';

@UseGuards(JwtAuthGuard)
@Controller('follower')
export class FollowerController {
  constructor(private readonly followerService: FollowerService) {}

  @Post(':id')
  follow(@Param('id') id: string, @Request() req: Request) {
    // @ts-ignore
    const userId = req.user.id;
    return this.followerService.follow(userId, +id);
  }

  @Delete(':id')
  unFollow(@Param('id') id: string, @Request() req: Request) {
    // @ts-ignore
    const userId = req.user.id;
    return this.followerService.unFollow(userId, +id);
  }

  // userga obuna bo'lgan
  @Get()
  findFollowers(@Request() req: Request) {
    // @ts-ignore
    const id = req.user.id;
    return this.followerService.findFollower(+id);
  }

  @Get('/following')
  findFollowing(@Request() req: Request) {
    // @ts-ignore
    const id = req.user.id;
    return this.followerService.findFollowing(+id);
  }
}
