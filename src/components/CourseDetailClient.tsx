'use client';

import { useState } from 'react';
import EditCourseModal from './EditCourseModal';

interface Props {
  slug: string;
  title: string;
  description: string;
  unlockDate: string;
  isPublished: boolean;
}

export default function CourseDetailClient({
  slug,
  title,
  description,
  unlockDate,
  isPublished,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-6">{title}</h1>

      <p className="text-gray-700 mb-4">{description}</p>

      <p className="text-gray-500">
        Unlocks: {new Date(unlockDate).toLocaleDateString()}
      </p>

      <p className="text-gray-500 mt-2">
        Status: {isPublished ? '✅ Published' : '🚧 Draft'}
      </p>

      <div className="mt-6 flex space-x-4">
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          ✏️ Edit Course
        </button>
        <button
          onClick={() => history.back()}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          🔙 Back
        </button>
      </div>

      {isEditing && (
        <EditCourseModal
          slug={slug}
          initialTitle={title}
          initialDescription={description}
          initialUnlockDate={unlockDate}
          isPublished={isPublished}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
}
