import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Photo } from './models/photo.model';
import { User } from '../users/model/user.model';

@Injectable()
export class PhotosService {
  constructor(@InjectModel(Photo) private photoRepo: typeof Photo) {}

  async create(createUserDto: CreatePhotoDto): Promise<Photo> {
    const { users, ...newPhoto } = createUserDto;

    // Photo yaratamiz
    const createdPhoto = await this.photoRepo.create(newPhoto, {
      include: [User],
    });

    // Photoni users rowiga set qilishimiz zarur
    await createdPhoto.$set('users', users);

    return createdPhoto;
  }

  findAll(): Promise<Photo[]> {
    return this.photoRepo.findAll({ include: [User] });
  }

  findOne(id: number): Promise<Photo> {
    return this.photoRepo.findByPk(id, {
      include: {
        all: true,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'UserPhoto'],
        },
      },
    });
  }

  findByUserId(id: number): Promise<Photo[]> {
    return this.photoRepo.findAll({
      include: {
        all: true,
        through: { attributes: [] },
        where: { id }, // faqat shu user yaratgan photolarni olish uchun
      },
    });
  }

  async update(
    id: number,
    updatePhotoDto: UpdatePhotoDto,
  ): Promise<Photo | { msg: string }> {
    const [updatedCount, updatedUsers] = await this.photoRepo.update(
      updatePhotoDto,
      { where: { id }, returning: true },
    );

    if (updatedCount > 0) return updatedUsers[0];

    return { msg: 'Not found by given id' };
  }

  async remove(id: number): Promise<{ msg: string }> {
    const deletedCount = await this.photoRepo.destroy({
      where: { id },
    });

    if (deletedCount > 0) return { msg: 'deleted successfully' };

    return { msg: 'Not found by given id' };
  }
}
