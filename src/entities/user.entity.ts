import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from './todos.entity'; 

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;  

  @Column({ type: 'varchar', unique: true })
  username: string;  

  @Column({ type: 'varchar', unique: true })
  email: string;  

  @Column({ type: 'varchar' })
  password: string;  
  @OneToMany(() => Task, (task) => task.createdBy)
  tasks: Task[]; 
}
