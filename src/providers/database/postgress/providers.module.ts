import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { readFileSync, readdirSync, statSync } from 'fs';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '12345',
        database: 'typeorm-todo',
        entities: await getEntitiesFromPath(join(__dirname, '../../../entities')),
        synchronize: false, 
      }),
    }),
  ],
})
export class PostgressDatabaseProviderModule {}

async function getEntitiesFromPath(entitiesPath: string): Promise<any[]> {
  const entities: any[] = [];

  const files = readdirSync(entitiesPath);
    console.log("files",files);
  for (const file of files) {
    const filePath = join(entitiesPath, file);
    const stats = statSync(filePath);

    if (stats.isFile() && 
        (filePath.endsWith('.entity.ts') || filePath.endsWith('.entity.js'))) {
      const entityModule = require(filePath); 
      entities.push(entityModule.default || entityModule); 
    } else if (stats.isDirectory()) {
      entities.push(...await getEntitiesFromPath(filePath)); 
    }
  }

  return entities;
}