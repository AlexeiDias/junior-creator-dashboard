import { connectMongo } from '@/lib/mongodb';
import Course from '@/models/Course';
import { notFound } from 'next/navigation';
import CourseActions from '@/components/CourseActions';

interface Props {
  params: {
    slug: string;
  };
}

// ✅ Fix for Next.js 15
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await Promise.resolve(params); // 👈 Force await params
  return {
    title: `Course: ${slug}`,
  };
}

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await Promise.resolve(params); // 👈 Force await params

  await connectMongo();

  const course = await Course.findOne({ slug }).lean();

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-6">{course.title}</h1>

      <p className="text-gray-700 mb-4">{course.description}</p>

      <p className="text-gray-500">
        Unlocks: {new Date(course.unlockDate).toLocaleDateString()}
      </p>

      <p className="text-gray-500 mt-2">
        Status: {course.isPublished ? '✅ Published' : '🚧 Draft'}
      </p>

      <div className="mt-6">
        <CourseActions slug={slug} />
      </div>
    </div>
  );
}
