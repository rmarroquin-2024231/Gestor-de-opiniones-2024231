import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    publicationId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Comment', commentSchema);