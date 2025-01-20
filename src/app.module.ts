import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { TodosModule } from './todos/todos.module';
import * as dotenv from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
import {JwtGlobalModule} from './JwtGlobalModule'
dotenv.config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost/nest-todo'),
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET || "fd18b8832e225bc0f69432a14ad9c20c3dbbccf758decac5d77553e8743fc470",
    //   signOptions: { expiresIn: '1h' },
    // }),
    AuthModule,
    JwtGlobalModule,
    TodosModule,
  ],
})
export class AppModule {}
