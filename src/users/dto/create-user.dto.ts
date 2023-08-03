import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    title: 'name',
    example: 'test_1',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    title: 'username',
    example: 'test_1',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    title: 'password',
    description: 'minimuim 8 characters password',
    example: '88888888',
  })
  password: string;
}
