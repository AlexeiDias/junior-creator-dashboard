'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import CreateLessonForm from '@/components/CreateLessonForm';
import axios from 'axios'; // ✅ Needed to fetch lessons

interface Lesson {
  _id: string;
  title: string;
  description: string;
  week: number;
  day: number;
}

export default function AdminDashboard() {
  const [showForm, setShowForm] = useState(false);
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await axios.get('/api/lessons'); // ✅ You must have a /api/lessons endpoint
        setLessons(res.data);
      } catch (error) {
        console.error('Error fetching lessons', error);
      }
    };

    fetchLessons();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">🛠 Admin Dashboard</h1>

      <button
        onClick={() => setShowForm(true)}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-6"
      >
        ➕ Create New Lesson
      </button>

      {showForm && (
        <CreateLessonForm onClose={() => setShowForm(false)} />
      )}

      {/* ✅ List of Lessons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {lessons.map((lesson) => (
          <div key={lesson._id} className="border rounded-lg p-6 shadow hover:shadow-lg transition-all">
            <h2 className="text-2xl font-semibold mb-2">{lesson.title}</h2>
            <p className="text-gray-600 mb-4">{lesson.description}</p>

            <Link
              href={`/admin/lessons/${lesson._id}/edit`}
              className="inline-block mt-2 text-blue-600 hover:underline"
            >
              ✏️ Edit Lesson
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
