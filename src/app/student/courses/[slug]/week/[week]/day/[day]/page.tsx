import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';

const COURSE_SLUG = 'web-dev-ai'; // fixed for now

interface LessonMeta {
  title: string;
  description: string;
  week: number;
  day: number;
}

export default async function StudentHome() {
  const weekNumber = 1; // 🔥 Later we can make this dynamic (current week)
  const lessonsDir = path.join(
    process.cwd(),
    'content',
    'courses',
    COURSE_SLUG,
    'weeks',
    `week-${weekNumber}`
  );

  const lessonFiles = fs.readdirSync(lessonsDir).filter((file) => file.endsWith('.md'));

  const lessons: LessonMeta[] = lessonFiles.map((file) => {
    const fullPath = path.join(lessonsDir, file);
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContent);

    const dayNumber = parseInt(file.split('-')[1]);

    return {
      title: data.title || `Day ${dayNumber}`,
      description: data.description || '',
      week: weekNumber,
      day: dayNumber,
    };
  });

  // 🔥 Get today's date
  const today = new Date();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">📅 This Week's Lessons</h1>
      <div className="grid grid-cols-1 gap-4">
        {lessons.map((lesson) => {
          const lessonDate = new Date(today);
          lessonDate.setDate(today.getDate() + (lesson.day - 1));

          const isUnlocked = today >= lessonDate;

          return (
            <div
              key={lesson.day}
              className={`p-6 rounded-lg shadow border ${
                isUnlocked ? 'bg-white' : 'bg-gray-200 opacity-50'
              }`}
            >
              <h2 className="text-xl font-semibold">{lesson.title}</h2>
              <p className="text-gray-700 mb-2">{lesson.description}</p>

              {isUnlocked ? (
                <Link
                  href={`/student/courses/${COURSE_SLUG}/week/${lesson.week}/day/${lesson.day}`}
                  className="text-green-600 underline"
                >
                  Start Lesson ➡️
                </Link>
              ) : (
                <p className="text-red-500 font-semibold">🔒 Unlocks soon</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
