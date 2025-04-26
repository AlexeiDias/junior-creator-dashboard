import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'; // ✅ To read markdown metadata

const courseSlug = 'web-dev-ai'; // Fixed for now

// Handle POST (Create lesson)
export async function POST(request: Request) {
  try {
    const { title, description, week, day } = await request.json();

    const dirPath = path.join(
      process.cwd(),
      'content',
      'courses',
      courseSlug,
      'weeks',
      `week-${week}`
    );

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const filePath = path.join(dirPath, `day-${day}.md`);

    const content = `---
title: "${title}"
description: "${description}"
week: ${week}
day: ${day}
---

## Objective:

(Write the lesson content here)
`;

    fs.writeFileSync(filePath, content);

    return NextResponse.json({ message: 'Lesson created successfully!' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

// Handle GET (Fetch lessons)
export async function GET() {
  try {
    const baseDir = path.join(
      process.cwd(),
      'content',
      'courses',
      courseSlug,
      'weeks'
    );

    const lessons: any[] = [];

    if (!fs.existsSync(baseDir)) {
      return NextResponse.json([]);
    }

    const weeks = fs.readdirSync(baseDir);

    for (const week of weeks) {
      const weekPath = path.join(baseDir, week);
      const days = fs.readdirSync(weekPath);

      for (const dayFile of days) {
        if (dayFile.endsWith('.md')) {
          const dayPath = path.join(weekPath, dayFile);
          const fileContent = fs.readFileSync(dayPath, 'utf-8');
          const { data } = matter(fileContent);

          lessons.push({
            _id: `${week}-${dayFile.replace('.md', '')}`, // simulate an ID
            title: data.title || 'Untitled',
            description: data.description || '',
            week: data.week,
            day: data.day,
          });
        }
      }
    }

    return NextResponse.json(lessons);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to load lessons' }, { status: 500 });
  }
}
