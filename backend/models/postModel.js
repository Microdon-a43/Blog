import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  picture: { type: String, default: '' },
  title: { type: String, default: '', required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  createdAT: { type: Date, default: new Date() },
  likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  views: { type: Number, default: 0 },
  userID: { type: mongoose.Types.ObjectId, ref: 'User' },
  author: { type: String, default: '' },
});

export default mongoose.model('Post', postSchema);
