import { Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Authority, VerificationStatus } from './authority.entity';
import { CreateAuthorityDto } from './dto/create-authority.dto';
import { LoginAuthorityDto } from './dto/login-authority.dto';

@Injectable()
export class AuthoritiesService {
  constructor(
    @InjectRepository(Authority)
    private readonly authorityRepository: Repository<Authority>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: CreateAuthorityDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const authority = this.authorityRepository.create({
      ...dto,
      password: hashedPassword,
      verificationStatus: VerificationStatus.PENDING,
      isActive: false,
    });

    return this.authorityRepository.save(authority);
  }

  async login(dto: LoginAuthorityDto) {
    const authority = await this.authorityRepository.findOne({
      where: { badgeNumber: dto.badgeNumber },
    });

    if (!authority) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(dto.password, authority.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (authority.verificationStatus !== VerificationStatus.VERIFIED) {
      throw new ForbiddenException('Authority not verified yet');
    }

    const payload = {
      sub: authority.id,
      badgeNumber: authority.badgeNumber,
      type: 'authority',
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}