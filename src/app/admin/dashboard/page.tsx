'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import RevenueTrendsChart from '@/components/RevenueTrendsChart';
import TopPerformingStudents from '@/components/TopPerformingStudents';
import EnrollmentStats from '@/components/EnrollmentStats';
import DashboardStatsCard from '@/components/DashboardStatsCard'; // 🆕

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">📊 Dashboard Overview</h1>

      {/* 📊 Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <DashboardStatsCard
          title="Students Enrolled"
          value={128}
          emoji="🎓"
          bgColor="bg-gradient-to-r from-green-400 to-green-600"
        />
        <DashboardStatsCard
          title="Courses Offered"
          value={3}
          emoji="📚"
          bgColor="bg-gradient-to-r from-blue-400 to-blue-600"
        />
        <DashboardStatsCard
          title="Badges Earned"
          value={452}
          emoji="🏆"
          bgColor="bg-gradient-to-r from-yellow-400 to-yellow-600"
        />
        <DashboardStatsCard
          title="Student Feedback"
          value={36}
          emoji="💬"
          bgColor="bg-gradient-to-r from-pink-400 to-pink-600"
        />
        <DashboardStatsCard
          title="Total Revenue"
          value="$12,850"
          emoji="💵"
          bgColor="bg-gradient-to-r from-purple-400 to-purple-600"
        />
      </div>

      {/* 📈 Revenue Trends */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">💵 Revenue Trends</h2>
        <RevenueTrendsChart />
      </div>

      {/* 🎯 Enrollment Trends */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 Enrollment Trends</h2>
        <EnrollmentStats />
      </div>

      {/* 🏆 Top Performing Students */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">🏆 Top Performing Students</h2>
        <TopPerformingStudents />
      </div>

      {/* 🕒 Recent Activity */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">🕒 Recent Activity</h2>
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
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

    </div>
  );
}
