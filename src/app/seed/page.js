import { connectMongo } from '../../lib/mongodb';
import Course from '../../models/Course';




export default async function SeedPage() {
  await connectMongo();

  // Create a course if none exist
  const courseCount = await Course.countDocuments();

  if (courseCount === 0) {
    await Course.create({
      title: 'Web Development & AI Creator Track',
      slug: 'web-dev-ai',
      description: 'Learn full-stack web dev and AI app creation.',
      isPublished: true,
      unlockDate: new Date(),
    });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10">
      <h1 className="text-3xl font-bold mb-4">✅ Course seeded!</h1>
      <a href="/" className="text-blue-500 underline">← Back to Dashboard</a>
    </div>
  );
}
