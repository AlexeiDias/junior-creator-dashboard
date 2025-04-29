'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import CourseTree from '@/components/CourseTree';

const courses = [
  {
    id: 'web-dev-ai',
    title: 'Web Development & AI',
    description: 'Learn full-stack web development and AI basics for ages 9–12.',
    weeks: 12,
    lessons: 60,
    published: true,
  },
  {
    id: 'media-arts-summer-camp',
    title: 'Media Arts Summer Camp',
    description: 'Unleash creativity with digital art, video editing, and storytelling.',
    weeks: 8,
    lessons: 40,
    published: false,
  },
  {
    id: 'cybersecurity-it-essentials',
    title: 'Cybersecurity + IT Essentials',
    description: 'Foundations of cybersecurity, safe online behavior, and IT basics.',
    weeks: 10,
    lessons: 50,
    published: true,
  },
];

export default function CourseOverviewPage() {
  const params = useParams();
  const { slug } = params as { slug: string };

  const course = courses.find((c) => c.id === slug);

  if (!course) {
    return <div className="p-10 text-2xl text-red-700">❌ Course not found!</div>;
  }

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">{course.title}</h1>

      <p className="text-gray-800 text-lg mb-6">{course.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-green-700 mb-2">🗓️ Weeks</h2>
          <p className="text-2xl font-bold text-gray-900">{course.weeks}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-green-700 mb-2">📋 Lessons</h2>
          <p className="text-2xl font-bold text-gray-900">{course.lessons}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-green-700 mb-2">✅ Published Status</h2>
          <p className="text-2xl font-bold text-gray-900">
            {course.published ? '✅ Published' : '❌ Draft'}
          </p>
        </div>
      </div>

      {/* 🌟 Manage Course Button */}
      <Link
        href={`/admin/dashboard/courses/${course.id}/manage`}
        className="inline-block bg-blue-900 hover:bg-blue-700 text-white text-lg font-bold px-6 py-3 rounded shadow"
      >
        🛠️ Manage Course
      </Link>
      {/* 📋 Course Breakdown Tree View */}
<CourseTree courseId={course.id} />
    </div>
  );
}
