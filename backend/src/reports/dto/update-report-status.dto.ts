import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ReportStatus } from '../report.entity';

export class UpdateReportStatusDto {
  @ApiProperty({
    enum: ReportStatus,
    example: ReportStatus.IN_REVIEW,
  })
  @IsEnum(ReportStatus)
  status: ReportStatus;
}