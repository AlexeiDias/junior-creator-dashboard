'use client';

import Link from 'next/link';

const courses = [
  {
    id: 'web-dev-ai',
    title: 'Web Development & AI',
    weeks: 12,
    lessons: 60,
    published: true,
  },
  {
    id: 'media-arts-summer-camp',
    title: 'Media Arts Summer Camp',
    weeks: 8,
    lessons: 40,
    published: false,
  },
  {
    id: 'cybersecurity-it-essentials',
    title: 'Cybersecurity + IT Essentials',
    weeks: 10,
    lessons: 50,
    published: true,
  },
];

export default function CoursesDashboardPage() {
  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">📚 Courses Management</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-green-900 text-white">
              <th className="py-3 px-6 text-left">📚 Course Title</th>
              <th className="py-3 px-6 text-center">🗓️ Weeks</th>
              <th className="py-3 px-6 text-center">📋 Lessons</th>
              <th className="py-3 px-6 text-center">✅ Published</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-t">
                <td className="py-4 px-6 text-gray-900">
                  <Link href={`/admin/dashboard/courses/${course.id}`} className="text-blue-700 hover:underline">
                    {course.title}
                  </Link>
                </td>
                <td className="py-4 px-6 text-gray-900 text-center">{course.weeks}</td>
                <td className="py-4 px-6 text-gray-900 text-center">{course.lessons}</td>
                <td className="py-4 px-6 text-gray-900 text-center">
                  {course.published ? (
                    <span className="text-green-900 font-semibold">✅ Yes</span>
                  ) : (
                    <span className="text-gray-900">❌ No</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
