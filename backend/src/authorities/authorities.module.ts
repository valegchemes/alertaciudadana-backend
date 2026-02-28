import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthoritiesService } from './authorities.service';
import { AuthoritiesController } from './authorities.controller';
import { Authority } from './authority.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Authority]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthoritiesController],
  providers: [AuthoritiesService],
})
export class AuthoritiesModule {}