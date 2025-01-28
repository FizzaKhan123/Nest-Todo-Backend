// src/database/seeds/all-seeders.ts
import { Injectable } from '@nestjs/common';
import { UserSeeder } from './user.seeder';
import { TaskSeeder } from './task.seeder';

@Injectable()
export class AllSeeder {
  constructor(
    private userSeeder: UserSeeder,
    private taskSeeder: TaskSeeder,
  ) {}

  // Function to seed both users and tasks
  async seed() {
    await this.userSeeder.seed();
    await this.taskSeeder.seed();
    console.log('Users and Tasks seeded');
  }
}
