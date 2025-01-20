
import { Controller, Get, Post, Body, Param, Delete, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';  // Import the custom guard
import { TodosService } from './todos.service';
import { Task } from './todos.schema';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Controller('todos')
@UseGuards(JwtAuthGuard)  
export class TodosController {
  constructor(private todosService: TodosService,
    @InjectModel('Task') private taskModel: Model<Task>,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  async create(
    @Body() body: { title: string; description: string },
    @Req() req: any,
  ): Promise<Task> {
   
    return this.todosService.create(body.title, body.description, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  async findAll(@Req() req: any): Promise<Task[]> {

    return this.todosService.findAll(req.user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by ID' })
  async findOne(@Param('id') id: string, @Req() req: any): Promise<Task> {
    return this.todosService.findOne(id, req.user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a task' })
  async update(
    @Param('id') id: string,
    @Body() body: { title: string; description: string },
    @Req() req: any,
  ): Promise<Task> {
    // The token has already been validated by the guard
    return this.todosService.update(id, body.title, body.description, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({ status: 200, type: Object })
  async remove(@Param('id') id: string, @Req() req: any): Promise<{ message: string }> {
    // The token has already been validated by the guard
    return this.todosService.remove(id, req.user);
  }
}
