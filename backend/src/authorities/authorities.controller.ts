import { Controller, Post, Body } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthoritiesService } from './authorities.service';
import { CreateAuthorityDto } from './dto/create-authority.dto';
import { LoginAuthorityDto } from './dto/login-authority.dto';

@Controller('authorities')
export class AuthoritiesController {
  constructor(private readonly authoritiesService: AuthoritiesService) {}

  @Post('register')
  register(@Body() dto: CreateAuthorityDto) {
    return this.authoritiesService.register(dto);
  }

  @Post('login')
  @ApiOkResponse({
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  login(@Body() dto: LoginAuthorityDto) {
    return this.authoritiesService.login(dto);
  }
}