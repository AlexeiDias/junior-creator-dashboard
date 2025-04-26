'use client';

import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function CreateLessonForm({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [week, setWeek] = useState(1);
  const [day, setDay] = useState(1);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post('/api/lessons', { title, description, week, day });
      toast.success('✅ Lesson created successfully');
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('❌ Error creating lesson.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">➕ New Lesson</h2>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Lesson Title</label>
          <input
  type="text"
  placeholder="Lesson Title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  required
  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
/>

        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Lesson Description</label>
          <textarea
  placeholder="Short Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  required
  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
/>

        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-gray-700 font-semibold mb-2">Week #</label>
            <input
  type="number"
  value={week}
  onChange={(e) => setWeek(Number(e.target.value))}
  required
  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
  placeholder="Week number"
/>
          </div>

          <div className="w-1/2">
            <label className="block text-gray-700 font-semibold mb-2">Day #</label>
            <input
  type="number"
  value={day}
  onChange={(e) => setDay(Number(e.target.value))}
  required
  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
  placeholder="Day number"
/>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button 
            type="submit" 
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
          >
            Save
          </button>

          <button 
            type="button" 
            onClick={onClose}
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
