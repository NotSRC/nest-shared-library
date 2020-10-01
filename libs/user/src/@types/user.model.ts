import { Document } from 'mongoose';

export enum UserRole {
  Member = 'MEMBER',
  Sales = 'SALES',
}

export interface User extends Document {
  createdAt: Date;
  email: string;
  _id: string;
  name: string;
  role: UserRole;
  password: string;
  language: string;
}
