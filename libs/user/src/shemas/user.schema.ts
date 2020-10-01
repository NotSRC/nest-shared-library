import { Schema } from 'mongoose';
import { UserRole } from '../@types/user.model';

export const UserSchema = new Schema(
  {
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 128,
    },
    name: {
      type: String,
      maxlength: 128,
      index: true,
      trim: true,
    },
    role: {
      type: String,
      default: UserRole.Member,
    },
    language: {
      type: String,
      default: 'en',
    },
  },
  {
    timestamps: true,
  },
);
