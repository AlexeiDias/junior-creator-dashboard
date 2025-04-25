import { connectMongo } from '@/lib/mongodb';
import Course from '@/models/Course';
import Link from 'next/link';
import PublishToggle from '@/components/PublishToggle';
import XPTracker from '@/components/XPTracker';

interface CourseType {
  _id: string;
  title: string;
  slug: string;
  description: string;
  isPublished: boolean;
  unlockDate: Date;
}

export default async function DashboardPage() {
  await connectMongo();
  const dbCourses = await Course.find().lean();

  const courses: CourseType[] = dbCourses.map((doc: any) => ({
    _id: doc._id.toString(),
    title: doc.title,
    slug: doc.slug,
    description: doc.description,
    isPublished: doc.isPublished,
    unlockDate: doc.unlockDate,
  }));

  return (
    <div className="min-h-screen p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Admin Dashboard 📚</h1>
        <Link
          href="/create"
          className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
        >
          ➕ Create New Course
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="border rounded-lg p-6 shadow hover:shadow-lg transition-all relative"
          >
            {/* ✨ Publish/Unpublish Toggle */}
            <div className="absolute top-4 right-4">
              <PublishToggle
                slug={course.slug}
                initialStatus={course.isPublished}
              />
            </div>

            {/* ✅ Title is now the only clickable Link */}
            <h2 className="text-2xl font-semibold mb-2">
              <Link href={`/courses/${course.slug}`} className="hover:underline">
                {course.title}
              </Link>
            </h2>

            <p className="text-gray-600 mb-4">{course.description}</p>

            <p className="text-sm text-gray-400">
              Unlocks: {new Date(course.unlockDate).toLocaleDateString()}
            </p>
            <XPTracker />

          </div>
        ))}
      </div>
    </div>
  );
}
