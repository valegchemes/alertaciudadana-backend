import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReportDto {
  @ApiProperty({
    example: 'Bache en la calle',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Hay un bache grande en la esquina principal',
  })
  @IsNotEmpty()
  description: string;
}