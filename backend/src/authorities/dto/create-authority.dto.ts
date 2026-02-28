import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorityDto {
  @ApiProperty({ example: 'Policía' })
  @IsNotEmpty()
  institution: string;

  @ApiProperty({ example: 'Buenos Aires' })
  @IsNotEmpty()
  province: string;

  @ApiProperty({ example: '12345' })
  @IsNotEmpty()
  badgeNumber: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  password: string;
}