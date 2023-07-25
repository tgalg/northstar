import { IsString, IsNumber, IsNotEmpty } from '@nestjs/class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  
  @IsNumber()
  @IsNotEmpty()
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  email: string;
}
