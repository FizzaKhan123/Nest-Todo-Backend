import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import {AuthModule} from './auth/auth.module';
import { TodosModule } from './todos/todos.module';
import * as dotenv from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
import {JwtGlobalModule} from './JwtGlobalModule'
import { Task } from './entities/todos.entity';
import * as path from 'path';
import * as glob from 'glob';
import { PostgressDatabaseProviderModule } from './providers/database/postgress/providers.module';
import { AllSeeder } from './database/seeders/all-seeders';
import { SeederModule } from './database/seeders/seeder.module';
const fs = require('fs');
dotenv.config();







@Module({
  imports: [
    PostgressDatabaseProviderModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || "fd18b8832e225bc0f69432a14ad9c20c3dbbccf758decac5d77553e8743fc470",
      signOptions: { expiresIn: '1h' },
    }),
    
    AuthModule,
    JwtGlobalModule,
    TodosModule,
    // SeederModule,
  ],
  // providers:[AllSeeder]
})
export class AppModule {}
