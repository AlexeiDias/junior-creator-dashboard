import { connectMongo } from '@/lib/mongodb';
import Course from '@/models/Course';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await connectMongo();

    const body = await req.json();

    const course = new Course(body);
    await course.save();

    return NextResponse.json({ message: '✅ Course created' }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: '❌ Failed to create course' }, { status: 500 });
  }
}
