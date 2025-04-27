'use client';

import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function RevenueTrendsChart() {
  const revenueData = Array.from({ length: 6 }, () => faker.number.int({ min: 2000, max: 12000 }));

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <Line
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              label: 'Revenue ($)',
              data: revenueData,
              borderColor: '#10B981',
              backgroundColor: 'rgba(16, 185, 129, 0.2)',
              fill: true,
              tension: 0.4,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { display: true, position: 'top' },
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
