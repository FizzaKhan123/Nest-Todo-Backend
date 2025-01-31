import { Module } from '@nestjs/common';
import { UserSeeder } from './user.seeder';
import { TaskSeeder } from './task.seeder';
import { Task } from '../entities/todos.entity'; 
import { User } from '../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
imports:[TypeOrmModule.forFeature([Task,User]) ],
  providers: [UserSeeder, TaskSeeder],
  exports: [UserSeeder, TaskSeeder], 
})
export class SeederModule {}
