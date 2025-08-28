import mongoose from '../db';

const QuizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },     // "Unit 2 quiz"
    course: { type: String, required: true },    // "Physics 02"
    topic: { type: String, required: true },     // "Motion and Forces"
    dueDate: { type: Date, required: true }
  },
  { timestamps: true }
);

export type Quiz = mongoose.InferSchemaType<typeof QuizSchema>;
export default mongoose.model('Quiz', QuizSchema);
