import mongoose, { Schema } from 'mongoose';
import { recipientSchema } from './Recipient';

const surveySchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  body: String,
  subject: String,
  recipients: [recipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  dateSent: Date,
  lastResponded: Date
});

mongoose.model('surveys', surveySchema);
