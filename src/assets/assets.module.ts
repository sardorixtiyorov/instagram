import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Asset } from './model/asset.model';

@Module({
  imports: [SequelizeModule.forFeature([Asset])],
  controllers: [AssetsController],
  providers: [AssetsService],
})
export class AssetsModule {}
