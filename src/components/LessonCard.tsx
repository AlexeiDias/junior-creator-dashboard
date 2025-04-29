'use client';

interface LessonCardProps {
  day: number;
  title: string;
}

export default function LessonCard({ day, title }: LessonCardProps) {
  return (
    <div className="border p-4 rounded-lg flex justify-between items-center bg-gray-50">
      <div>
        <p className="text-lg font-semibold text-gray-900">Day {day}</p>
        <p className="text-gray-700">{title}</p>
      </div>
      <div className="space-x-2">
        <button className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded">✏️ Edit</button>
        <button className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded">🗑️ Delete</button>
      </div>
    </div>
  );
}
