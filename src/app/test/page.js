import { connectMongo } from '../../lib/mongodb';

export default async function TestPage() {
  await connectMongo();

  return (
    <div>
      <h1>✅ Connected to MongoDB!</h1>
    </div>
  );
}
