import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.usersRepository.find({
      select: ['id', 'email', 'role', 'createdAt'],
    });
  }

  async create(userData: Partial<User>) {
    if (!userData.password) {
      throw new BadRequestException('Password is required');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = this.usersRepository.create({
      ...userData,
      password: hashedPassword,
      role: 'USER',
    });

    return this.usersRepository.save(user);
  }

  async promoteToAdmin(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    user.role = 'ADMIN';

    return this.usersRepository.save(user);
  }
}