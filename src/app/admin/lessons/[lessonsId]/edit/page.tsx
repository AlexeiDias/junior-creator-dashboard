'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
export default function EditLessonPage() {
  const { lessonId } = useParams() as { lessonId: string };
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await axios.get(`/api/lessons/${lessonId}`);
        setContent(res.data.content);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchLesson();
  }, [lessonId]);

  const handleSave = async () => {
    try {
      await axios.put(`/api/lessons/${lessonId}`, { content });
      toast.success('✅ Lesson updated!');
    } catch (error) {
      console.error(error);
      toast.error('❌ Error saving lesson.');

    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">✏️ Edit Lesson</h1>
      
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-[500px] border rounded p-4 font-mono text-sm"
      />

      <button
        onClick={handleSave}
        className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
      >
        💾 Save Changes
      </button>
    </div>
  );
}
