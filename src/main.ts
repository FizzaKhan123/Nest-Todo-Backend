// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AllSeeder } from './database/seeders/all-seeders';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const allSeeder = app.get(AllSeeder);
  // await allSeeder.seed();
  await app.listen(3000);
}
bootstrap();
// how to run this project
// npm run start:dev
