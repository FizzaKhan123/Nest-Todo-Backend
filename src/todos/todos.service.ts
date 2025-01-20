// src/todos/todos.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './todos.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel('Task') private taskModel: Model<Task>,
    private jwtService: JwtService,
  ) {}


  async create(title: string, description: string, user: any): Promise<Task> {
    const newTask = new this.taskModel({
      title,
      description,
      createdBy: user.sub, 
    });
    console.log("new task ",newTask);
    return await newTask.save();
  }

  // Get all tasks
  async findAll(user: any): Promise<Task[]> {
    return await this.taskModel.find({ createdBy: user.sub }).exec(); 
  }

  // Get a task by ID
  async findOne(id: string, user: any): Promise<Task> {
    return await this.taskModel.findOne({ _id: id, createdBy: user.sub }).exec();
  }

  // Update a task
  async update(id: string, title: string, description: string, user: any): Promise<Task> {
    return await this.taskModel.findOneAndUpdate(
      { _id: id, createdBy: user.sub }, 
      { title, description, updatedAt: new Date() },
      { new: true },
    );
  }

  // Delete a task
  async remove(id: string, user: any): Promise<{ message: string }> {
    await this.taskModel.findOneAndDelete({ _id: id, createdBy: user.sub });  // Ensure the task belongs to the user
    return { message: 'Task deleted successfully' };
  }
}
