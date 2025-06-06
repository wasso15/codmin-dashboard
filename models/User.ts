import { Schema, model, Document } from "mongoose";
import mongoose from "mongoose";

export interface IUser extends Document {
  lastname: string;
  middlename: string;
  firstname: string;
  username: string;
  email: string;
  password: string;
  role: "admin" | "viewer";
  genre: "masculin" | "féminin";
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    middlename: {
      type: String,
      required: true,
      trim: true,
    },
    firstname: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["admin", "viewer"],
      default: "viewer",
    },

    genre: {
      type: String,
      enum: ["masculin", "féminin"],
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || model<IUser>("User", UserSchema);
