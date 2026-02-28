import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report, ReportStatus } from './report.entity';
import { User } from '../users/user.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportStatusDto } from './dto/update-report-status.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportsRepository: Repository<Report>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(dto: CreateReportDto, userId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const report = this.reportsRepository.create({
      ...dto,
      user,
      status: ReportStatus.PENDING,
    });

    return this.reportsRepository.save(report);
  }

  findAll() {
    return this.reportsRepository.find();
  }

  async updateStatus(id: number, dto: UpdateReportStatusDto) {
    const report = await this.reportsRepository.findOne({
      where: { id },
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    report.status = dto.status;

    return this.reportsRepository.save(report);
  }
}