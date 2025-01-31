import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import {AuthModule} from './auth/auth.module';
import { TodosModule } from './todos/todos.module';
// import { JwtModule } from '@nestjs/jwt';
import {JwtGlobalModule} from './JwtGlobalModule'
// import { Task } from './entities/todos.entity';
// import * as path from 'path';
// import * as glob from 'glob';
import { PostgressDatabaseProviderModule } from './providers/database/postgress/providers.module';
import { AllSeeder } from './database/seeders/all-seeders';
import { SeederModule } from './database/seeders/seeder.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { config } from 'dotenv';
config();

console.log("Process",process.env.DB_PORT,process.env.DB_HOST);


@Module({
  imports: [
    ConfigModule.forRoot(),
    PostgressDatabaseProviderModule,
    AuthModule,
    JwtGlobalModule,
    TodosModule,
    // SeederModule,
  ],
  // providers:[AllSeeder]
})
export class AppModule {}
