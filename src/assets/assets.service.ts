import { Injectable } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Asset } from './model/asset.model';
import { join, resolve } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileType } from './assets.controller';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';

@Injectable()
export class AssetsService {
  constructor(@InjectModel(Asset) private readonly assetRepo: typeof Asset) {}

  async create(createAssetDto: CreateAssetDto, id: number) {
    return this.assetRepo.create({ ...createAssetDto, photo_id: id });
  }

  async upload(url: fileType): Promise<CreateAssetDto> {
    const url_asset = join(__dirname, '..', 'public');
    const extension = url.originalname.split('.').slice(-1)[0];

    const isExists = existsSync(url_asset);
    if (!isExists) {
      await mkdir(url_asset, {
        recursive: true,
      });
    }

    const filePath = uuidv4() + '.' + extension;

    await writeFile(resolve(url_asset, filePath), url.buffer);

    return {
      url: filePath,
      extension,
    };
  }

  findAll() {
    return `This action returns all assets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} asset`;
  }

  update(id: number, updateAssetDto: UpdateAssetDto) {
    return `This action updates a #${id} asset`;
  }

  remove(id: number) {
    return `This action removes a #${id} asset`;
  }
}
