import mongoose, { Schema, Document } from 'mongoose';

export const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export interface Task  {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy:string;
}
