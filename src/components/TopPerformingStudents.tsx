'use client';

export default function TopPerformingStudents() {
  const students = [
    { name: 'Alice Johnson', badge: '🏆 Top Coder' },
    { name: 'Max Carter', badge: '🚀 Rocket Learner' },
    { name: 'Emily Wang', badge: '💡 Innovator' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <ul className="space-y-4">
        {students.map((student, index) => (
          <li key={index} className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">{student.name}</span>
            <span className="text-xl">{student.badge}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
