import { Controller, Get, Post, Body, Param, Delete, Put, Req, UseGuards, Patch } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';  // Import the custom guard
import { TodosService } from './todos.service';
import { Task } from '../database/entities/todos.entity'; // Task entity for TypeORM
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm'; // Import InjectRepository
import { Repository } from 'typeorm'; // Import Repository from TypeORM
import { UpdateTaskDto } from '../dto/task/UpdateDto';
import { CreateTaskDto } from '../dto/task/CreateTaskDto';

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
    @Body() createTaskDto: CreateTaskDto,  
    @Req() req: any,
  ): Promise<Task> {
    return this.todosService.create(createTaskDto.title, createTaskDto.description, req.user);
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
    @Body() body: CreateTaskDto,
    @Req() req: any,
  ): Promise<Task> {
    // Update a task by its ID
    return this.todosService.update(id, body.title, body.description, req.user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Partially update a task' })
  async partialUpdate(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,  
    @Req() req: any,
  ): Promise<Task> {
    return this.todosService.partialUpdate(id, updateTaskDto, req.user);
  }



  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({ status: 200, type: Object })
  async remove(@Param('id') id: number, @Req() req: any): Promise<{ message: string }> {
    // Remove a task by its ID
    return this.todosService.remove(id, req.user);
  }
}
