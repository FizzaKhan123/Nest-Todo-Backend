import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { User } from './auth/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import {AuthModule} from './auth/auth.module';
import { TodosModule } from './todos/todos.module';
import * as dotenv from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
import {JwtGlobalModule} from './JwtGlobalModule'
import { Task } from './todos/todos.entity';
dotenv.config();
@Module({
  imports: [
    // MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost/nest-todo'),
    JwtModule.register({
      secret: process.env.JWT_SECRET || "fd18b8832e225bc0f69432a14ad9c20c3dbbccf758decac5d77553e8743fc470",
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres', // Database type
      host: 'localhost', // Database host
      port: 5432, // Database port
      username: 'postgres', // Database username
      password: '12345', // Database password
      database: 'typeorm-todo', // Database name
      entities: [User,Task], // List of entities
      synchronize: true, // Set to `false` in production to avoid auto-syncing
    }),
    AuthModule,
    JwtGlobalModule,
    TodosModule,
  ],
})
export class AppModule {}
