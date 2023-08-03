import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

export type fileType = {
  originalname: string;
  fieldname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
};

@Controller('asset')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @UseInterceptors(FileInterceptor('url'))
  @Post(':id')
  async create(
    @Param('id') id: string,
    @UploadedFile()
    url: fileType,
  ) {
    const file = await this.assetsService.upload(url);

    return this.assetsService.create(file, +id);
  }

  @Get()
  findAll() {
    return this.assetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assetsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssetDto: UpdateAssetDto) {
    return this.assetsService.update(+id, updateAssetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assetsService.remove(+id);
  }
}
