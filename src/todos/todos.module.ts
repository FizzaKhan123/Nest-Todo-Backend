import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { Task } from './todos.entity'; // Import Task Entity
import { User } from '../auth/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]), 
     forwardRef(() => User)
  ],
  controllers: [TodosController],
  providers: [TodosService],
  exports: [TypeOrmModule],
})
export class TodosModule {}
