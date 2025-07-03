import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // prevents duplicates
    trim: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Category', categorySchema);
