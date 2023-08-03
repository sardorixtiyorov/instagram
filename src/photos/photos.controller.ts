import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from './models/photo.model';
import { JwtAuthGuard } from '../guards/jwt-auth-guard';

@Controller('photo')
@UseGuards(JwtAuthGuard)
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post()
  create(@Body() createPhotoDto: CreatePhotoDto): Promise<Photo> {
    return this.photosService.create(createPhotoDto);
  }

  @Get()
  findAll(): Promise<Photo[]> {
    return this.photosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Photo> {
    return this.photosService.findOne(+id);
  }

  @Get('user/:id')
  findOneByUser(@Param('id') id: string): Promise<Photo[]> {
    return this.photosService.findByUserId(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePhotoDto: UpdatePhotoDto,
  ): Promise<
    | Photo
    | {
        msg: string;
      }
  > {
    return this.photosService.update(+id, updatePhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<
    | Photo
    | {
        msg: string;
      }
  > {
    return this.photosService.remove(+id);
  }
}
