import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    title: 'name',
  })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    title: 'username',
  })
  username?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    title: 'password',
    description: 'minimuim 8 characters password',
  })
  password?: string;
}
