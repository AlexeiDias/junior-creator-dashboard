import { connectMongo } from '@/lib/mongodb';
import Course from '@/models/Course';
import { notFound } from 'next/navigation';
import CourseDetailClient from '@/components/CourseDetailClient';

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  await connectMongo();

  const course = await Course.findOne({ slug: params.slug }).lean();

  if (!course) notFound();

  return (
    <CourseDetailClient
      slug={params.slug}
      title={course.title}
      description={course.description}
      unlockDate={new Date(course.unlockDate).toISOString()}
      isPublished={course.isPublished}
    />
  );
}
