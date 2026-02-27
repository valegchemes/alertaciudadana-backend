import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() userData: Partial<User>) {
    return this.usersService.create(userData);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Patch(':id/promote')
  promote(@Param('id') id: string) {
    return this.usersService.promoteToAdmin(+id);
  }
}