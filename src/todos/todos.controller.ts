import { Controller, Get, Post, Body, Param, Delete, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';  // Import the custom guard
import { TodosService } from './todos.service';
import { Task } from './todos.entity'; // Task entity for TypeORM
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm'; // Import InjectRepository
import { Repository } from 'typeorm'; // Import Repository from TypeORM

@Controller('todos')
@UseGuards(JwtAuthGuard)  
export class TodosController {
  constructor(
    private todosService: TodosService,
    @InjectRepository(Task) private taskRepository: Repository<Task>,  // Inject the Task repository
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  async create(
    @Body() body: { title: string; description: string },
    @Req() req: any,
  ): Promise<Task> {
    // Call the service to create a new task, passing the necessary data
    return this.todosService.create(body.title, body.description, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  async findAll(@Req() req: any): Promise<Task[]> {
    // Fetch all tasks for the authenticated user
    return this.todosService.findAll(req.user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by ID' })
  async findOne(@Param('id') id: number, @Req() req: any): Promise<Task> {
    // Fetch a task by its ID
    return this.todosService.findOne(id, req.user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a task' })
  async update(
    @Param('id') id: number,
    @Body() body: { title: string; description: string },
    @Req() req: any,
  ): Promise<Task> {
    // Update a task by its ID
    return this.todosService.update(id, body.title, body.description, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({ status: 200, type: Object })
  async remove(@Param('id') id: number, @Req() req: any): Promise<{ message: string }> {
    // Remove a task by its ID
    return this.todosService.remove(id, req.user);
  }
}
