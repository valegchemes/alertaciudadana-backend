import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'varchar',
    default: 'USER',
  })
  role: string;

  @Column({ nullable: true })
  firstName: string;

  @CreateDateColumn()
  createdAt: Date;
}