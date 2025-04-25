'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  params: {
    slug: string;
  };
}

export default function EditCoursePage({ params }: Props) {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [unlockDate, setUnlockDate] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    async function fetchCourse() {
      const res = await fetch(`/api/courses/${params.slug}`);
      const data = await res.json();

      setTitle(data.title);
      setDescription(data.description);
      setUnlockDate(new Date(data.unlockDate).toISOString().split('T')[0]);
      setIsPublished(data.isPublished);
    }

    fetchCourse();
  }, [params.slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/courses/${params.slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        unlockDate,
        isPublished,
      }),
    });

    if (res.ok) {
      router.push(`/courses/${params.slug}`);
    } else {
      alert('❌ Failed to update course');
    }
  };

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-6">✏️ Edit Course</h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            className="w-full border p-2 rounded"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            className="w-full border p-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Unlock Date</label>
          <input
            className="w-full border p-2 rounded"
            type="date"
            value={unlockDate}
            onChange={(e) => setUnlockDate(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          <label>Published</label>
        </div>

        <button
          type="submit"
          className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600"
        >
          Update Course
        </button>
      </form>
    </div>
  );
}
