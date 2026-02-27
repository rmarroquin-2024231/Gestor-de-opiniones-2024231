import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  publicationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Publication'
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String, 
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Comment', commentSchema);