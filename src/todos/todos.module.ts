import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { Task } from './todos.entity'; 
import { User } from '../auth/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task,User]), 
    //  JwtModule.register({
    //       secret: 'fd18b8832e225bc0f69432a14ad9c20c3dbbccf758decac5d77553e8743fc470', // Your JWT secret key
    //       signOptions: { expiresIn: '1d' }, // JWT expiration time
    //     }),
  ],
  controllers: [TodosController],
  providers: [TodosService],
  exports: [TypeOrmModule],
})
export class TodosModule {}
