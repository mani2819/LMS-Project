import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true },
  timeLimit: { type: Number, default: 10 }, // in minutes
  maxAttempts: { type: Number, default: 3 },
});

const Quiz = mongoose.model('Quiz', quizSchema);
export default Quiz;