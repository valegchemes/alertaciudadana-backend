import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from './users/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [User],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
});