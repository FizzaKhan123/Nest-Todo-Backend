import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'typeorm-todo',
      entities:  [join(__dirname, '..', '..', '..', 'entities', '**', '*.entity.{ts,js}')],
      synchronize: false, 
    }),
  ],
})
export class PostgressDatabaseProviderModule {}
