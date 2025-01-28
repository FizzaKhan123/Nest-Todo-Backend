// src/database/seeds/task.seeder.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../entities/todos.entity';
import { User } from '../../entities/user.entity';

@Injectable()
export class TaskSeeder {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Function to seed the task data
  async seed() {
    // Fetch the specific users you want to associate tasks with
    const users = await this.userRepository.find();
    console.log("users",users);
    // Create tasks associated with specific users
    const tasks = [
      {
        title: 'Task 1 for John',
        description: 'This is the first task for John.',
        userId: users[0].id,  // John (first user)
      },
      {
        title: 'Task 2 for John',
        description: 'This is the second task for John.',
        userId: users[0].id,  // John (first user)
      },
      {
        title: 'Task 1 for Jane',
        description: 'This is the first task for Jane.',
        userId: users[1].id,  // Jane (second user)
      },
    ];

    // Insert tasks into the database
    await this.taskRepository.save(tasks);
    console.log('Tasks seeded and associated with specific users');
  }
}
