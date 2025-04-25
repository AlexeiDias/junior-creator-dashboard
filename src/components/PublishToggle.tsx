'use client'; // ✅ Client component because of event handling

import { useState } from 'react';

interface Props {
  slug: string;
  initialStatus: boolean;
}

export default function PublishToggle({ slug, initialStatus }: Props) {
  const [isPublished, setIsPublished] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const togglePublish = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // ✅ STOP click from reaching Link
    setLoading(true);
  
    const res = await fetch(`/api/courses/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isPublished: !isPublished,
      }),
    });
  
    if (res.ok) {
      setIsPublished(!isPublished);
    } else {
      alert('❌ Failed to toggle publish status');
    }
  
    setLoading(false);
  };
  

  return (
    <button
  onClick={(e) => togglePublish(e)}
  disabled={loading}
  className={`px-3 py-1 rounded text-xs font-semibold ${
    isPublished
      ? 'bg-green-100 text-green-800'
      : 'bg-yellow-100 text-yellow-800'
  }`}
>
  {loading ? 'Updating...' : isPublished ? 'Published' : 'Draft'}
</button>

  );
}
