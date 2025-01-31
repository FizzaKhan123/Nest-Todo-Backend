import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../database/entities/todos.entity';
import { UpdateTaskDto } from '../dto/task/UpdateDto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>, 
 
  ) {}

  // Create a new task
  async create(title: string, description: string, user: any): Promise<Task> {
    const task = this.taskRepository.create({
      title,
      description,
      createdBy: user.sub, 
    });

    return await this.taskRepository.save(task); 
  }

  
  async findAll(user: any): Promise<Task[]> {
    return await this.taskRepository.find({ where: { createdBy: user.sub } }); // Use the where condition to filter tasks by user
  }

  
  async findOne(id: number, user: any): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id, createdBy: user.sub }, 
    });

    if (!task) {
      throw new UnauthorizedException('Task not found or you do not have permission.');
    }

    return task;
  }

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


  async partialUpdate(id: number, updateTaskDto: UpdateTaskDto, user: any): Promise<Task> {
    // Find the task by ID and user
    const task = await this.taskRepository.findOne({ where: { id, createdBy: user.sub } });
    if (!task) {
      throw new Error('Task not found');
    }

    // Update only the fields that are provided in the DTO (partial update)
    if (updateTaskDto.title) {
      task.title = updateTaskDto.title;
    }
    if (updateTaskDto.description) {
      task.description = updateTaskDto.description;
    }

    // Save the updated task
    return this.taskRepository.save(task);
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
