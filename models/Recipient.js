import mongoose, { Schema } from 'mongoose';

export const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false }
});
