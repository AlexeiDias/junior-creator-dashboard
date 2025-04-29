'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Lesson {
  day: string;
  title: string;
}

interface CourseTreeProps {
  courseId: string;
}

export default function CourseTree({ courseId }: CourseTreeProps) {
  const [treeData, setTreeData] = useState<Record<string, Lesson[]>>({});
  const [expandedWeeks, setExpandedWeeks] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/courses/${courseId}/tree`);
      const data = await res.json();
      setTreeData(data);
    }

    fetchData();
  }, [courseId]);

  const toggleWeek = (week: string) => {
    if (expandedWeeks.includes(week)) {
      setExpandedWeeks(expandedWeeks.filter((w) => w !== week));
    } else {
      setExpandedWeeks([...expandedWeeks, week]);
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Course Content</h2>

      <ul className="bg-white rounded-lg shadow divide-y divide-gray-200">
        {Object.keys(treeData).map((week) => (
          <li key={week}>
            <button
              onClick={() => toggleWeek(week)}
              className="w-full flex justify-between items-center p-4 text-gray-800 hover:bg-gray-100"
            >
              <span>{week}</span>
              <span>{expandedWeeks.includes(week) ? '🔽' : '▶️'}</span>
            </button>

            {expandedWeeks.includes(week) && (
              <ul className="ml-8 bg-gray-50 py-2">
                {treeData[week].map((lesson) => (
                  <li key={lesson.day} className="py-1">
                    <Link
                      href={`/admin/dashboard/courses/${courseId}/weeks/${week}/days/${lesson.day}`}
                      className="text-blue-600 hover:underline"
                    >
                      📖 {lesson.title || `Day ${lesson.day}`}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
