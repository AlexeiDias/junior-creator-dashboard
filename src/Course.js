import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    unlockDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ Avoid model overwrite in dev
export default mongoose.models.Course || mongoose.model('Course', CourseSchema);
