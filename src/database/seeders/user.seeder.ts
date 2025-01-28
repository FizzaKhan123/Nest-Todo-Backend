// src/database/seeds/user.seeder.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../../entities/user.entity';


@Injectable()
export class UserSeeder {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Function to seed the user data
  async seed() {
    // Create 5 users
    const users = [
        {
            username: "MohsinKhan",
            email: "MohsinKhan@gmail.com",
            password: "123456",
        },
        {
            username: "TalhaKhan",
            email: "TalhaKhan@gmail.com",
            password: "123456",
        }

    ];
   

    await this.userRepository.save(users);
    console.log('Users seeded');
  }
}
