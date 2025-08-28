import mongoose from '../db';

const AnnouncementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: String, required: true },  // e.g., "Mrs. Salma Ahmed"
    course: { type: String, required: true },  // e.g., "Physics 02"
    avatarUrl: String
  },
  { timestamps: true }
);

export type Announcement = mongoose.InferSchemaType<typeof AnnouncementSchema>;
export default mongoose.model('Announcement', AnnouncementSchema);
