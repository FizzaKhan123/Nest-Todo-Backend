import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // Validate user by username or email and password
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: [{ username }, { email: username }],
    });

    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }

    return null;
  }

  
  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      message: 'User successfully logged in',
      access_token: this.jwtService.sign(payload),
    };
  }


  async register(username: string, email: string, password: string): Promise<any> {
    const existingUser = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });

    if (existingUser) {
      throw new BadRequestException('Username or email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(newUser);

    const payload = { username: savedUser.username, sub: savedUser.id };

    return {
      user: savedUser,
      access_token: this.jwtService.sign(payload),
    };
  }
}
