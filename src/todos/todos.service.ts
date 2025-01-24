// src/todos/todos.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './todos.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>, // Inject TypeORM repository
    private jwtService: JwtService,
  ) {}

  // Create a new task
  async create(title: string, description: string, user: any): Promise<Task> {
    const task = this.taskRepository.create({
      title,
      description,
      createdBy: user.sub, // Set createdBy as the user ID (sub from JWT)
    });

    console.log("new task ", task);
    return await this.taskRepository.save(task); // Save the new task
  }

  // Get all tasks created by the user
  async findAll(user: any): Promise<Task[]> {
    return await this.taskRepository.find({ where: { createdBy: user.sub } }); // Use the where condition to filter tasks by user
  }

  // Get a task by ID
  async findOne(id: number, user: any): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id, createdBy: user.sub }, // Ensure the task belongs to the user
    });

    if (!task) {
      throw new UnauthorizedException('Task not found or you do not have permission.');
    }

    return task;
  }

  // Update a task
  async update(id: number, title: string, description: string, user: any): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id, createdBy: user.sub } });

    if (!task) {
      throw new UnauthorizedException('Task not found or you do not have permission.');
    }

    task.title = title;
    task.description = description;
    task.updatedAt = new Date();

    return await this.taskRepository.save(task); // Update the task and save it
  }

  // Delete a task
  async remove(id: number, user: any): Promise<{ message: string }> {
    const task = await this.taskRepository.findOne({ where: { id, createdBy: user.sub } });

    if (!task) {
      throw new UnauthorizedException('Task not found or you do not have permission.');
    }

    await this.taskRepository.remove(task); // Delete the task
    return { message: 'Task deleted successfully' };
  }
}
