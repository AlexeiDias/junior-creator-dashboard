'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AdminDashboardPage() {
  const courseData = {
    labels: ['Web Dev + AI', 'Media Arts', 'Cybersecurity + IT'],
    datasets: [
      {
        label: 'Students Enrolled',
        data: [15, 10, 7],
        backgroundColor: ['#34D399', '#60A5FA', '#FBBF24'],
      },
    ],
  };

  const courseOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Students per Course 📚' },
    },
  };

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">📊 Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Students */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-green-700 mb-2">🎓 Students Enrolled</h2>
          <p className="text-3xl font-bold text-gray-900">128</p>
        </div>

        {/* Total Courses */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-green-700 mb-2">📚 Courses Offered</h2>
          <p className="text-3xl font-bold text-gray-900">3</p>
        </div>

        {/* Badges Earned */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-green-700 mb-2">🏆 Badges Earned</h2>
          <p className="text-3xl font-bold text-gray-900">452</p>
        </div>

        {/* Feedback Count */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-green-700 mb-2">💬 Student Feedback</h2>
          <p className="text-3xl font-bold text-gray-900">36</p>
        </div>

        {/* Revenue */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-green-700 mb-2">💵 Total Revenue</h2>
          <p className="text-3xl font-bold text-gray-900">$12,850</p>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">🕒 Recent Activity</h2>

        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          {/* Example activity items */}
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 text-green-700 p-2 rounded-full">➕</div>
            <div>
              <p className="text-gray-800">
                <span className="font-bold">New Lesson Added:</span> Introduction to Web Dev
              </p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-yellow-100 text-yellow-700 p-2 rounded-full">🏆</div>
            <div>
              <p className="text-gray-800">
                <span className="font-bold">Badge Earned:</span> Junior Coder
              </p>
              <p className="text-sm text-gray-500">4 hours ago</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 text-blue-700 p-2 rounded-full">🧑‍🎓</div>
            <div>
              <p className="text-gray-800">
                <span className="font-bold">New Enrollment:</span> Emily Johnson
              </p>
              <p className="text-sm text-gray-500">1 day ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Students per Course Chart */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Students Per Course</h2>

        <div className="bg-white p-6 rounded-lg shadow">
          <Bar data={courseData} options={courseOptions} />
        </div>
      </div>
    </div>
  );
}
