import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity'; 

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;  

  @Column({ type: 'varchar' })
  title: string;  

  @Column({ type: 'text' })
  description: string; 
  
  @Column({ type: 'text' })
  explanation: string; 

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;  // Task creation timestamp

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;  // Task update timestamp

  @ManyToOne(() => User, (user) => user.tasks, { eager: true })
  @JoinColumn({ name: 'createdBy' })
  createdBy: User;  // Foreign key to the User entity
}
