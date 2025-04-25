export const dynamic = 'force-dynamic';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import LessonCompletionCheckbox from '@/components/LessonCompletionCheckbox'; // ✅ Import the checkbox

interface LessonPageProps {
  params: {
    slug: string;
    week: string;
    day: string;
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug, week, day } = params;

  const lessonPath = path.join(
    process.cwd(),
    'content',
    'courses',
    slug,
    'weeks',
    `week-${week}`,
    `day-${day}.md`
  );

  try {
    const fileContent = fs.readFileSync(lessonPath, 'utf-8');
    const { data, content } = matter(fileContent);

    return (
      <div className="min-h-screen p-8">

        {/* Back Button */}
        <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">
          ⬅️ Back to Dashboard
        </Link>

        {/* Lesson Title and Content */}
        <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
        <p className="text-gray-600 mb-2">
          <strong>Objective:</strong> {data.objective}
        </p>
        <p className="text-gray-500 mb-6">📅 {new Date(data.date).toLocaleDateString()}</p>

        <div className="prose prose-lg max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-10">
          {parseInt(day) > 1 && (
            <Link
              href={`/courses/${slug}/week/${week}/day/${parseInt(day) - 1}`}
              className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
            >
              ⬅️ Previous Lesson
            </Link>
          )}
          {parseInt(day) < 5 && (
            <Link
              href={`/courses/${slug}/week/${week}/day/${parseInt(day) + 1}`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded ml-auto"
            >
              Next Lesson ➡️
            </Link>
          )}
        </div>

        {/* ✅ Add the Lesson Completion Checkbox */}
        <LessonCompletionCheckbox slug={slug} week={week} day={day} />

      </div>
    );
  } catch (error) {
    console.error('Lesson not found:', error);
    notFound();
  }
}
