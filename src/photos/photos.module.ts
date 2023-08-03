import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Photo } from './models/photo.model';
import { UserPhoto } from './models/user-photo.model';

@Module({
  imports: [SequelizeModule.forFeature([Photo, UserPhoto])],
  controllers: [PhotosController],
  providers: [PhotosService],
})
export class PhotosModule {}
