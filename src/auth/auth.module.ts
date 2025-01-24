import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './user.entity'; 
import { Task } from '../todos/todos.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
    forwardRef(() => Task),
    JwtModule.register({
      secret: 'fd18b8832e225bc0f69432a14ad9c20c3dbbccf758decac5d77553e8743fc470', // Your JWT secret key
      signOptions: { expiresIn: '1d' }, // JWT expiration time
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[AuthService,TypeOrmModule]
})
export class AuthModule {}
