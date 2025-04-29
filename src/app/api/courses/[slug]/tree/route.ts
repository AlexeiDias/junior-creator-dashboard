import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  const coursePath = path.join(
    process.cwd(),
    'content',
    'courses',
    slug,
    'weeks'
  );

  try {
    const weeks = await fs.readdir(coursePath);

    const treeData: Record<string, { day: string; title: string }[]> = {};

    for (const week of weeks) {
      const weekPath = path.join(coursePath, week);
      const days = await fs.readdir(weekPath);

      const lessons = await Promise.all(
        days
          .filter((dayFile) => dayFile.endsWith('.md'))
          .map(async (dayFile) => {
            const dayPath = path.join(weekPath, dayFile);
            const fileContent = await fs.readFile(dayPath, 'utf-8');

            const titleMatch = fileContent.match(/title:\s*["'](.+?)["']/);
            const title = titleMatch ? titleMatch[1] : '';

            return {
              day: dayFile.replace('.md', '').replace('day-', ''),
              title,
            };
          })
      );

      treeData[week] = lessons;
    }

    return NextResponse.json(treeData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to load course structure.' }, { status: 500 });
  }
}
