import { connectMongo } from '@/lib/mongodb';
import Course from '@/models/Course';
import { NextResponse } from 'next/server';

interface Params {
  params: {
    slug: string;
  };
}

// ✅ GET Single Course
export async function GET(req: Request, { params }: Params) {
  try {
    await connectMongo();
    const course = await Course.findOne({ slug: params.slug }).lean();

    if (!course) {
      return NextResponse.json({ message: '❌ Course not found' }, { status: 404 });
    }

    return NextResponse.json(course);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: '❌ Failed to fetch course' }, { status: 500 });
  }
}

// ✅ UPDATE Course
export async function PUT(req: Request, { params }: Params) {
  try {
    await connectMongo();
    const body = await req.json();

    const updatedCourse = await Course.findOneAndUpdate(
      { slug: params.slug },
      {
        title: body.title,
        description: body.description,
        unlockDate: body.unlockDate,
        isPublished: body.isPublished,
      },
      { new: true }
    );

    if (!updatedCourse) {
      return NextResponse.json({ message: '❌ Course not found for update' }, { status: 404 });
    }

    return NextResponse.json({ message: '✅ Course updated successfully' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: '❌ Failed to update course' }, { status: 500 });
  }
}

// ✅ DELETE Course
export async function DELETE(req: Request, { params }: Params) {
  try {
    await connectMongo();

    const deletedCourse = await Course.findOneAndDelete({ slug: params.slug });

    if (!deletedCourse) {
      return NextResponse.json({ message: '❌ Course not found for deletion' }, { status: 404 });
    }

    return NextResponse.json({ message: '✅ Course deleted successfully' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: '❌ Failed to delete course' }, { status: 500 });
  }
}
