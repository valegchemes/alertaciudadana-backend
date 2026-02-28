import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportStatusDto } from './dto/update-report-status.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  // ✅ USER crea reporte
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: CreateReportDto, @Request() req) {
    return this.reportsService.create(dto, req.user.userId);
  }

  // ✅ Cualquiera puede ver reportes
  @Get()
  findAll() {
    return this.reportsService.findAll();
  }

  // ✅ SOLO ADMIN cambia estado
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateReportStatusDto,
  ) {
    return this.reportsService.updateStatus(+id, dto);
  }
}