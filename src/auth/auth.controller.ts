// src/auth/auth.controller.ts
import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {CreateUserDto} from '../dto/auth/CreateUserDto';
import { ValidationPipe } from '@nestjs/common';
import { LoginDto } from '../dto/auth/LoginDto';

@Controller('auth')
@UsePipes(new ValidationPipe())
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user and get JWT token' })
  @ApiResponse({ status: 201, type: Object })

  async register(@Body() registerDto: CreateUserDto): Promise<any> {
    const { username, email, password } = registerDto;
    return this.authService.register(username, email, password);
  }
   

  @Post('login')
  @ApiOperation({ summary: 'Login a user and get JWT token' })
  @ApiResponse({ status: 200, type: Object })
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return this.authService.login(user);
  }
  
}
