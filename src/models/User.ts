// models/User.ts

import { Schema, model, models, Document } from 'mongoose'

export interface IUser extends Document {
  email: string
  password: string
  name: string
  salt: string
}

const UserSchema = new Schema<IUser>({
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name:     { type: String, required: true },
  salt:     { type: String, required: true },
}, { timestamps: true })

export default models.User || model<IUser>('User', UserSchema)
