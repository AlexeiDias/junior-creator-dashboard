'use client'; // ✅ THIS is a Client Component

import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Props {
  slug: string;
}

export default function CourseActions({ slug }: Props) {
  const router = useRouter();

  const deleteCourse = async () => {
    const confirmed = confirm('Are you sure you want to delete this course?');
    if (confirmed) {
      const res = await fetch(`/api/courses/${slug}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        router.push('/'); // Redirect back to dashboard
      } else {
        alert('❌ Failed to delete course');
      }
    }
  };

  return (
    <div className="flex space-x-4">
      <Link
        href="/"
        className="text-blue-500 hover:underline"
      >
        ← Back to Dashboard
      </Link>

      <Link
        href={`/courses/${slug}/edit`}
        className="text-yellow-500 hover:underline"
      >
        ✏️ Edit Course
      </Link>

      <button
        onClick={deleteCourse}
        className="text-red-500 hover:underline"
      >
        🗑️ Delete Course
      </button>
    </div>
  );
}
