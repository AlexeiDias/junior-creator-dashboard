'use client';

import LessonCard from './LessonCard';

interface Lesson {
  day: number;
  lesson: string;
}

interface WeekCardProps {
  weekNumber: number;
  lessons: Lesson[];
  expanded: boolean;
  onToggle: () => void;
  onAddLesson: () => void;
}

export default function WeekCard({ weekNumber, lessons, expanded, onToggle, onAddLesson }: WeekCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center text-left text-green-700 font-bold text-2xl focus:outline-none"
      >
        <span>Week {weekNumber}</span>
        <span>{expanded ? '🔽' : '▶️'}</span>
      </button>

      {expanded && (
        <div className="mt-4">
          <button
            onClick={onAddLesson}
            className="mb-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm"
          >
            ➕ Add New Lesson
          </button>

          <div className="space-y-4">
            {lessons.map((lesson) => (
              <LessonCard key={lesson.day} day={lesson.day} title={lesson.lesson} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
