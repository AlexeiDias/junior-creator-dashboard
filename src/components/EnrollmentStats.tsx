'use client';

import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

export default function EnrollmentStats() {
  const enrollments = Array.from({ length: 6 }, () => faker.number.int({ min: 50, max: 200 }));

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <Bar
        data={{
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Enrollments',
              data: enrollments,
              backgroundColor: '#3B82F6', // Tailwind blue-500
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
          },
          scales: {
            y: { ticks: { color: '#4B5563' } },
            x: { ticks: { color: '#4B5563' } },
          },
        }}
      />
    </div>
  );
}
