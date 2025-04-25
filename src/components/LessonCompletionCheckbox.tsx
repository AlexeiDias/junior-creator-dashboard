'use client';

import { useEffect, useState } from 'react';

interface Props {
  slug: string;
  week: string;
  day: string;
}

export default function LessonCompletionCheckbox({ slug, week, day }: Props) {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const key = `completed-${slug}-week${week}-day${day}`;
    const stored = localStorage.getItem(key);
    if (stored === 'true') {
      setCompleted(true);
    }
  }, [slug, week, day]);

  const toggleCompletion = () => {
    const key = `completed-${slug}-week${week}-day${day}`;
    const newStatus = !completed;
    setCompleted(newStatus);
    localStorage.setItem(key, newStatus.toString());
  
    // 🎮 Handle XP
    let currentXP = parseInt(localStorage.getItem('xp') || '0');
    if (newStatus) {
      currentXP += 10; // Earn 10 XP when lesson completed
    } else {
      currentXP -= 10; // Remove 10 XP if lesson unchecked
    }
    localStorage.setItem('xp', Math.max(currentXP, 0).toString());
  };
  

  return (
    <div className="mt-8">
      <label className="inline-flex items-center">
        <input
          type="checkbox"
          checked={completed}
          onChange={toggleCompletion}
          className="form-checkbox h-5 w-5 text-green-600"
        />
        <span className="ml-2 text-lg text-gray-700">Mark Lesson as Complete </span>
      </label>
    </div>
  );
}
