'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  slug: string;
  initialTitle: string;
  initialDescription: string;
  initialUnlockDate: string;
  isPublished: boolean;
  onClose: () => void;
}

export default function EditCourseModal({
  slug,
  initialTitle,
  initialDescription,
  initialUnlockDate,
  isPublished,
  onClose,
}: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [unlockDate, setUnlockDate] = useState(initialUnlockDate);
  const [published, setPublished] = useState(isPublished);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const res = await fetch(`/api/courses/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, unlockDate, isPublished: published }),
      });

      if (!res.ok) throw new Error('Failed to update course.');

      toast.success('✅ Course updated!');
      onClose();
    } catch (err) {
      toast.error('❌ Update failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Course</h2>

        <label className="block mb-2 font-semibold text-sm text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-4 text-black"
        />

        <label className="block mb-2 font-semibold text-sm text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border rounded mb-4 text-black"
        />

        <label className="block mb-2 font-semibold text-sm text-gray-700">Unlock Date</label>
        <input
          type="date"
          value={unlockDate.slice(0, 10)}
          onChange={(e) => setUnlockDate(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-4 text-black"
        />

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="mr-2"
          />
          <label className="text-sm text-gray-700">Published</label>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
