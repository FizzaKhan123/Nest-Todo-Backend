import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      migrations:[],
      entities:  [join(__dirname, '..', '..', '..', 'database' , 'entities', '**', '*.entity.{ts,js}')],
      synchronize: false, 
    }),
  ],
})
export class PostgressDatabaseProviderModule {}
