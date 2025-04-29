'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import WeekCard from '@/components/WeekCard';
import path from 'path';
import fs from 'fs/promises';

interface Lesson {
  day: number;
  lesson: string;
}

interface Week {
  week: number;
  days: Lesson[];
}

export default function ManageCoursePage() {
  const { slug } = useParams() as { slug: string };

  const [courseStructure, setCourseStructure] = useState<Week[]>([]);
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([]);

  useEffect(() => {
    async function fetchCourseData() {
      try {
        const res = await fetch(`/api/courses/${slug}`);
        const data = await res.json();
        setCourseStructure(data.weeks);
      } catch (err) {
        console.error('Error loading course:', err);
      }
    }
    fetchCourseData();
  }, [slug]);

  const toggleWeek = (weekNumber: number) => {
    setExpandedWeeks((prev) =>
      prev.includes(weekNumber) ? prev.filter((w) => w !== weekNumber) : [...prev, weekNumber]
    );
  };

  const addNewLesson = (weekNumber: number) => {
    const newLessonTitle = prompt('Enter new lesson title:');
    if (!newLessonTitle) return;

    setCourseStructure((prev) =>
      prev.map((week) =>
        week.week === weekNumber
          ? {
              ...week,
              days: [...week.days, { day: week.days.length + 1, lesson: newLessonTitle }],
            }
          : week
      )
    );
  };

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">🛠️ Manage Course: {slug}</h1>

      <div className="space-y-6">
        {courseStructure.map((week) => (
          <WeekCard
            key={week.week}
            weekNumber={week.week}
            lessons={week.days}
            expanded={expandedWeeks.includes(week.week)}
            onToggle={() => toggleWeek(week.week)}
            onAddLesson={() => addNewLesson(week.week)}
          />
        ))}
      </div>
    </div>
  );
}
