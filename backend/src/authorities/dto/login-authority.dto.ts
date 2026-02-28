import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthorityDto {
  @ApiProperty({ example: '12345' })
  @IsNotEmpty()
  badgeNumber: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  password: string;
}